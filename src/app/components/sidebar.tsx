import { useState, useMemo } from "react";
import { BrandLogo } from "./brand-logo";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronDown,
  Search,
  CreditCard,
  RectangleHorizontal,
  List,
  Layers,
  Navigation,
  ToggleLeft,
  Activity,
  SortAsc,
  Tag,
  PanelLeftOpen,
  Archive,
  X,
  Smartphone,
  Play,
} from "lucide-react";
import {
  AnimationCategory,
  AnimationItem,
  animationCategories,
} from "./animation-data";

// ── Constants ──────────────────────────────────────────────────────────

const categoryIcons: Record<string, React.ReactNode> = {
  blank: <Smartphone className="w-4 h-4" />,
  intros: <Play className="w-4 h-4" />,
  cards: <CreditCard className="w-4 h-4" />,
  buttons: <RectangleHorizontal className="w-4 h-4" />,
  lists: <List className="w-4 h-4" />,
  modals: <Layers className="w-4 h-4" />,
  navigation: <Navigation className="w-4 h-4" />,
  inputs: <ToggleLeft className="w-4 h-4" />,
  feedback: <Activity className="w-4 h-4" />,
};

type SortMode = "default" | "alpha" | "duration";

const sortLabels: Record<SortMode, string> = {
  default: "Category",
  alpha: "A → Z",
  duration: "Duration",
};

const quickTags = [
  "spring",
  "ease-out",
  "gesture",
  "scale",
  "slide",
  "opacity",
  "3d",
  "stagger",
  "loop",
  "tap",
  "drag",
  "state-change",
];

function parseDuration(d: string): number {
  const match = d.match(/(\d+)/);
  return match ? parseInt(match[1]) : 0;
}

// ── SearchFilter ───────────────────────────────────────────────────────

function SearchFilter({
  searchQuery,
  onSearchChange,
  searchFocused,
  onFocusChange,
  isFiltering,
  onClearAll,
}: {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  searchFocused: boolean;
  onFocusChange: (focused: boolean) => void;
  isFiltering: boolean;
  onClearAll: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-2 flex-shrink-0 border-b border-white/5 px-[12px] py-[20px]"
    >
      {/* Search bar */}
      <div
        className={`flex items-center gap-2 bg-white/5 rounded-lg px-2.5 py-1.5 transition-colors ${ searchFocused ? "bg-white/10 ring-1 ring-white/20" : "" } p-[10px] m-[0px]`}
      >
        <Search className="w-3.5 h-3.5 text-white/30 flex-shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => onFocusChange(true)}
          onBlur={() => onFocusChange(false)}
          placeholder="Search patterns..."
          className="bg-transparent text-[12px] text-white/80 placeholder-white/25 outline-none flex-1 min-w-0"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="flex-shrink-0"
          >
            <X className="w-3 h-3 text-white/30 hover:text-white/60" />
          </button>
        )}
      </div>

      {/* Sort + clear row */}
      <div className="flex items-center justify-end">
        {isFiltering && (
          <button
            onClick={onClearAll}
            className="text-[10px] text-violet-400 hover:text-violet-300"
          >
            Clear all
          </button>
        )}
      </div>
    </motion.div>
  );
}

// ── CategorySection ────────────────────────────────────────────────────

function CategorySection({
  category,
  collapsed,
  expanded,
  selectedItem,
  onToggleSection,
  onToggleCollapse,
  onSelectItem,
}: {
  category: AnimationCategory;
  collapsed: boolean;
  expanded: boolean;
  selectedItem: AnimationItem | null;
  onToggleSection: () => void;
  onToggleCollapse: () => void;
  onSelectItem: (item: AnimationItem) => void;
}) {
  const hasSelectedItem =
    selectedItem && category.items.some((item) => item.id === selectedItem.id);

  return (
    <div className="mb-0.5">
      {/* Section Header */}
      <button
        onClick={() => {
          if (collapsed) {
            onToggleCollapse();
          } else {
            onToggleSection();
          }
        }}
        className="relative w-full flex items-center gap-2.5 hover:bg-white/5 transition-colors px-[16px] py-[12px]"
      >
        {/* Active category indicator bar */}
        {hasSelectedItem && !expanded && (
          <span className="absolute right-0 top-1 bottom-1 w-[4px] rounded-l-full bg-white/60" />
        )}
        <span className="text-white/40 flex-shrink-0">
          {categoryIcons[category.id]}
        </span>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-center justify-between flex-1 overflow-hidden"
            >
              <div className="flex items-center gap-2">
                <span className="text-[11px] tracking-widest uppercase text-white/40 whitespace-nowrap">
                  {category.name}
                </span>
                <span className="text-[10px] text-white/15">
                  {category.items.length}
                </span>
              </div>
              <motion.div
                animate={{ rotate: expanded ? 0 : -90 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-3 h-3 text-white/20" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Items */}
      <AnimatePresence initial={false}>
        {!collapsed && expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {category.items.map((item) => {
              const isSelected = selectedItem?.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectItem(item)}
                  className={`w-full text-left pl-11 pr-4 py-1.5 transition-all duration-150 group ${
                    isSelected
                      ? "bg-white/10 text-white"
                      : "text-white/50 hover:text-white/80 hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] truncate">
                      {item.name}
                    </span>
                    <span
                      className={`text-[9px] opacity-0 group-hover:opacity-100 transition-opacity ${
                        isSelected ? "opacity-100" : ""
                      } text-white/25`}
                    >
                      {item.easing}
                    </span>
                  </div>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── InteractionTypeFilter ──────────────────────────────────────────────

function InteractionTypeFilter({
  expanded,
  onToggleExpanded,
  selectedTags,
  onToggleTag,
}: {
  expanded: boolean;
  onToggleExpanded: () => void;
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
}) {
  return (
    <div className="mt-1">
      <div className="mx-3 border-t border-white/10" />
      <div className="px-1 py-2 mx-2">
        <button
          onClick={onToggleExpanded}
          className="w-full flex items-center gap-2.5 px-1 py-2 hover:bg-white/5 transition-colors rounded-md"
        >
          <span className="text-white/40 flex-shrink-0">
            <Tag className="w-4 h-4" />
          </span>
          <div className="flex items-center justify-between flex-1 overflow-hidden">
            <div className="flex items-center gap-2">
              <span className="text-[11px] tracking-widest uppercase text-white/40 whitespace-nowrap">
                Interaction Type
              </span>
              <span className="text-[10px] text-white/15">
                {selectedTags.length > 0
                  ? `${selectedTags.length} selected`
                  : quickTags.length}
              </span>
            </div>
            <motion.div
              animate={{ rotate: expanded ? 0 : -90 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-3 h-3 text-white/20" />
            </motion.div>
          </div>
        </button>
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-1 pl-7 pr-1 pb-2">
                {quickTags.map((tag) => {
                  const isActive = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      onClick={() => onToggleTag(tag)}
                      className={`px-2 py-0.5 rounded-md text-[10px] transition-colors ${
                        isActive
                          ? "bg-violet-500/30 text-violet-300 ring-1 ring-violet-500/40"
                          : "bg-white/5 text-white/30 hover:text-white/50 hover:bg-white/8"
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ── SortFilter ─────────────────────────────────────────────────────────

const sortModes: SortMode[] = ["default", "alpha", "duration"];

function SortFilter({
  sortMode,
  onSetSortMode,
  expanded,
  onToggleExpanded,
}: {
  sortMode: SortMode;
  onSetSortMode: (mode: SortMode) => void;
  expanded: boolean;
  onToggleExpanded: () => void;
}) {
  return (
    <div className="mt-1">
      <div className="mx-3 border-t border-white/10" />
      <div className="px-1 py-2 mx-2">
        <button
          onClick={onToggleExpanded}
          className="w-full flex items-center gap-2.5 px-1 py-2 hover:bg-white/5 transition-colors rounded-md"
        >
          <span className="text-white/40 flex-shrink-0">
            <SortAsc className="w-4 h-4" />
          </span>
          <div className="flex items-center justify-between flex-1 overflow-hidden">
            <div className="flex items-center gap-2">
              <span className="text-[11px] tracking-widest uppercase text-white/40 whitespace-nowrap">
                Sort
              </span>
              <span className="text-[10px] text-white/15">
                {sortLabels[sortMode]}
              </span>
            </div>
            <motion.div
              animate={{ rotate: expanded ? 0 : -90 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-3 h-3 text-white/20" />
            </motion.div>
          </div>
        </button>
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-3 gap-1.5 pl-7 pr-1 pb-2">
                {sortModes.map((mode) => {
                  const isActive = sortMode === mode;
                  return (
                    <button
                      key={mode}
                      onClick={() => onSetSortMode(mode)}
                      className={`aspect-square rounded-lg flex flex-col items-center justify-center gap-1 transition-colors ${
                        isActive
                          ? "bg-violet-500/30 ring-1 ring-violet-500/40"
                          : "bg-white/5 hover:bg-white/10"
                      }`}
                    >
                      <SortAsc className={`w-3.5 h-3.5 ${isActive ? "text-violet-300" : "text-white/30"}`} />
                      <span className={`text-[9px] ${isActive ? "text-violet-300" : "text-white/30"}`}>
                        {sortLabels[mode]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ── Sidebar (main export) ──────────────────────────────────────────────

interface SidebarProps {
  selectedItem: AnimationItem | null;
  onSelectItem: (item: AnimationItem) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export function Sidebar({
  selectedItem,
  onSelectItem,
  collapsed,
  onToggleCollapse,
}: SidebarProps) {
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >(
    animationCategories.reduce(
      (acc, cat) => {
        acc[cat.id] = false;
        return acc;
      },
      {} as Record<string, boolean>
    )
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [sortMode, setSortMode] = useState<SortMode>("default");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagsExpanded, setTagsExpanded] = useState(false);
  const [sortExpanded, setSortExpanded] = useState(false);

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const [archiveExpanded, setArchiveExpanded] = useState(false);

  // Collect archived items across all categories
  const archivedItems = useMemo(() => {
    return animationCategories.flatMap((cat) =>
      cat.items.filter((item) => item.archived)
    );
  }, []);

  // Filter & search logic (excluding archived items)
  const filteredCategories = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return animationCategories
      .map((cat) => {
        const filtered = cat.items.filter((item) => {
          if (item.archived) return false;

          const matchesSearch =
            !query ||
            item.name.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query) ||
            cat.name.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query) ||
            item.tags.some((t) => t.toLowerCase().includes(query)) ||
            item.useCase.toLowerCase().includes(query);

          const matchesTags =
            selectedTags.length === 0 ||
            selectedTags.some((tag) => item.tags.includes(tag));

          return matchesSearch && matchesTags;
        });

        let sorted = [...filtered];
        if (sortMode === "alpha") {
          sorted.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortMode === "duration") {
          sorted.sort((a, b) => parseDuration(a.duration) - parseDuration(b.duration));
        }

        return { ...cat, items: sorted };
      })
      .filter((cat) => cat.items.length > 0);
  }, [searchQuery, selectedTags, sortMode]);

  const totalResults = filteredCategories.reduce(
    (acc, cat) => acc + cat.items.length,
    0
  );
  const totalAll = animationCategories.reduce(
    (acc, cat) => acc + cat.items.filter((item) => !item.archived).length,
    0
  );
  const isFiltering = searchQuery || selectedTags.length > 0;

  return (
    <motion.div
      className="h-screen bg-[#1a1a2e] text-white flex flex-col overflow-hidden relative z-10"
      animate={{ width: collapsed ? 56 : 280 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-white/10 flex-shrink-0">
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-2 overflow-hidden whitespace-nowrap"
            >
              <span className="flex items-center gap-2">
                <BrandLogo />
                <span className="text-[14px] tracking-tight text-white/90 px-[0px] pt-[5px] pb-[0px]">
                  Motion Library
                </span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={onToggleCollapse}
          className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-white/10 transition-colors flex-shrink-0"
        >
          {collapsed ? (
            <PanelLeftOpen className="w-4 h-4 text-white/60" />
          ) : (
            <PanelLeftOpen className="w-4 h-4 text-white/60" />
          )}
        </button>
      </div>

      {/* Search + Filter */}
      <AnimatePresence>
        {!collapsed && (
          <SearchFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            searchFocused={searchFocused}
            onFocusChange={setSearchFocused}
            isFiltering={!!isFiltering}
            onClearAll={() => {
              setSearchQuery("");
              setSelectedTags([]);
            }}
          />
        )}
      </AnimatePresence>

      {/* Collapsed search icon */}
      {collapsed && (
        <button
          onClick={onToggleCollapse}
          className="px-4 py-3 flex justify-center"
        >
          <Search className="w-4 h-4 text-white/40" />
        </button>
      )}

      {/* Nav Items */}
      <div className="flex-1 overflow-y-auto py-2">
        {filteredCategories.length === 0 && !collapsed ? (
          <div className="px-4 py-8 text-center">
            <Search className="w-6 h-6 text-white/10 mx-auto mb-2" />
            <p className="text-[12px] text-white/25">No patterns found</p>
            <p className="text-[10px] text-white/15 mt-1">
              Try a different search term
            </p>
          </div>
        ) : (
          filteredCategories.map((category) => (
            <CategorySection
              key={category.id}
              category={category}
              collapsed={collapsed}
              expanded={expandedSections[category.id]}
              selectedItem={selectedItem}
              onToggleSection={() => toggleSection(category.id)}
              onToggleCollapse={onToggleCollapse}
              onSelectItem={onSelectItem}
            />
          ))
        )}

        {/* Interaction Type */}
        {!collapsed && (
          <InteractionTypeFilter
            expanded={tagsExpanded}
            onToggleExpanded={() => setTagsExpanded(!tagsExpanded)}
            selectedTags={selectedTags}
            onToggleTag={toggleTag}
          />
        )}

        {/* Archive */}
        {!collapsed && archivedItems.length > 0 && (
          <div className="mt-1">
            <div className="mx-3 border-t border-white/10" />
            <div className="px-1 py-2 mx-2">
              <button
                onClick={() => setArchiveExpanded(!archiveExpanded)}
                className="w-full flex items-center gap-2.5 px-1 py-2 hover:bg-white/5 transition-colors rounded-md"
              >
                <span className="text-white/40 flex-shrink-0">
                  <Archive className="w-4 h-4" />
                </span>
                <div className="flex items-center justify-between flex-1 overflow-hidden">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] tracking-widest uppercase text-white/40 whitespace-nowrap">
                      Archive
                    </span>
                    <span className="text-[10px] text-white/15">
                      {archivedItems.length}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: archiveExpanded ? 0 : -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-3 h-3 text-white/20" />
                  </motion.div>
                </div>
              </button>
              <AnimatePresence initial={false}>
                {archiveExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    {archivedItems.map((item) => {
                      const isSelected = selectedItem?.id === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => onSelectItem(item)}
                          className={`w-full text-left pl-7 pr-4 py-1.5 transition-all duration-150 group ${
                            isSelected
                              ? "bg-white/10 text-white"
                              : "text-white/50 hover:text-white/80 hover:bg-white/5"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[13px] truncate">
                              {item.name}
                            </span>
                            <span
                              className={`text-[9px] opacity-0 group-hover:opacity-100 transition-opacity ${
                                isSelected ? "opacity-100" : ""
                              } text-white/25`}
                            >
                              {item.easing}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Sort */}
        {!collapsed && (
          <SortFilter
            sortMode={sortMode}
            onSetSortMode={setSortMode}
            expanded={sortExpanded}
            onToggleExpanded={() => setSortExpanded(!sortExpanded)}
          />
        )}
      </div>

      {/* Footer */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-4 py-2.5 border-t border-white/5 flex-shrink-0"
          >
            <p className="text-[10px] text-white/20">
              {isFiltering
                ? `${totalResults} of ${totalAll} patterns`
                : `${totalAll} patterns`}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}