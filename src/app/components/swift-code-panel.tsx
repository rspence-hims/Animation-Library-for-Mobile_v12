import { AnimationItem } from "./animation-data";
import { motion } from "motion/react";
import { useState, useCallback, useEffect } from "react";
import { Copy, Check, Download, Code2 } from "lucide-react";

interface SwiftCodePanelProps {
  item: AnimationItem | null;
}

export function SwiftCodePanel({ item }: SwiftCodePanelProps) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [swiftCode, setSwiftCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Load Swift source lazily when item changes
  useEffect(() => {
    if (!item?.swiftFile) {
      setSwiftCode(null);
      return;
    }
    setLoading(true);
    fetch(`/src/swift/${item.swiftFile}`)
      .then((res) => (res.ok ? res.text() : null))
      .then((text) => setSwiftCode(text))
      .catch(() => setSwiftCode(null))
      .finally(() => setLoading(false));
  }, [item?.swiftFile]);

  const handleCopy = useCallback(async () => {
    if (!swiftCode) return;
    await navigator.clipboard.writeText(swiftCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [swiftCode]);

  const handleDownloadZip = useCallback(async () => {
    if (!item?.swiftFile || !swiftCode) return;
    setDownloading(true);

    try {
      const JSZip = (await import("jszip")).default;
      const zip = new JSZip();
      const pkg = item.swiftPackage;

      if (pkg) {
        // Multi-file Swift package
        const root = zip.folder(pkg.exportName)!;

        // Fetch each Swift file
        for (const filename of pkg.files) {
          const res = await fetch(`/src/swift/${pkg.folder}/${filename}`);
          if (res.ok) {
            root.file(filename, await res.text());
          }
        }

        // Fetch IMPLEMENTATION.md
        const mdRes = await fetch(`/src/swift/${pkg.folder}/IMPLEMENTATION.md`);
        if (mdRes.ok) {
          root.file("IMPLEMENTATION.md", await mdRes.text());
        }

        // Build Assets.xcassets
        const xcassets = root.folder("Assets.xcassets")!;
        xcassets.file(
          "Contents.json",
          JSON.stringify(
            { info: { version: 1, author: "xcode" } },
            null,
            2
          )
        );

        for (const [imagesetName, sourceFilename] of Object.entries(
          pkg.assets
        )) {
          const imageset = xcassets.folder(`${imagesetName}.imageset`)!;
          imageset.file(
            "Contents.json",
            JSON.stringify(
              {
                images: [
                  {
                    filename: `${imagesetName}.png`,
                    idiom: "universal",
                    scale: "1x",
                  },
                  { idiom: "universal", scale: "2x" },
                  { idiom: "universal", scale: "3x" },
                ],
                info: { version: 1, author: "xcode" },
              },
              null,
              2
            )
          );
          const imgRes = await fetch(`/src/assets/${sourceFilename}`);
          if (imgRes.ok) {
            imageset.file(`${imagesetName}.png`, await imgRes.blob());
          }
        }

        const blob = await zip.generateAsync({ type: "blob" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${pkg.exportName}.zip`;
        a.click();
        URL.revokeObjectURL(url);
      } else {
        // Legacy single-file zip
        zip.file(item.swiftFile, swiftCode);

        if (item.assetFiles) {
          const assetsFolder = zip.folder("Assets");
          for (const assetName of item.assetFiles) {
            const response = await fetch(`/src/assets/${assetName}`);
            if (response.ok) {
              const blob = await response.blob();
              assetsFolder?.file(assetName, blob);
            }
          }
        }

        const blob = await zip.generateAsync({ type: "blob" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${item.id}-swift.zip`;
        a.click();
        URL.revokeObjectURL(url);
      }
    } finally {
      setDownloading(false);
    }
  }, [item, swiftCode]);

  // No item selected
  if (!item) {
    return (
      <div className="h-full flex items-center justify-center px-8">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-white/5 mx-auto flex items-center justify-center">
            <Code2 className="w-8 h-8 text-white/20" />
          </div>
          <p className="text-white/30 text-[14px]">
            Select an animation from the sidebar
          </p>
        </div>
      </div>
    );
  }

  // Loading
  if (loading) {
    return (
      <div className="h-full flex items-center justify-center px-8">
        <p className="text-white/30 text-[14px]">Loading...</p>
      </div>
    );
  }

  // Item selected but no Swift file available
  if (!swiftCode) {
    return (
      <div className="h-full flex items-center justify-center px-8">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-white/5 mx-auto flex items-center justify-center">
            <Code2 className="w-8 h-8 text-white/20" />
          </div>
          <p className="text-white/30 text-[14px]">
            Swift code not yet available
          </p>
          <p className="text-white/15 text-[12px]">
            Coming soon for this animation
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col"
    >
      {/* Header — pinned */}
      <div className="flex-shrink-0 p-6 pb-0 space-y-6">
        {/* Title */}
        <div>
          <p className="text-[11px] tracking-widest uppercase text-white/30 mb-1">
            Swift Code
          </p>
          <h2 className="text-white text-[22px] tracking-tight">{item.name}</h2>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-[12px] text-white/60"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-400" />
                <span className="text-green-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Swift code</span>
              </>
            )}
          </button>
          <button
            onClick={handleDownloadZip}
            disabled={downloading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-[12px] text-white/60 disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{downloading ? "Zipping..." : "Download zip"}</span>
          </button>
        </div>
      </div>

      {/* Code area — scrollable */}
      <div className="flex-1 min-h-0 overflow-y-auto p-6 pt-6">
        <div className="rounded-xl bg-[#0d0d1a] p-4">
          <pre className="text-[12px] text-violet-200/80 font-mono leading-relaxed whitespace-pre overflow-x-auto">
            <code>{swiftCode}</code>
          </pre>
        </div>
      </div>
    </motion.div>
  );
}
