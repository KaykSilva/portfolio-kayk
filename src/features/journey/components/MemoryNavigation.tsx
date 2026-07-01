import type { JourneyMemory } from "../data/memories";
import styles from "../journey.module.css";

type MemoryNavigationProps = {
  activeIndex: number;
  memories: readonly JourneyMemory[];
  onSelect: (index: number) => void;
};

export function MemoryNavigation({ activeIndex, memories, onSelect }: MemoryNavigationProps) {
  return (
    <nav className={styles.memoryNavigation} aria-label="Navegar pelas memórias">
      <button
        type="button"
        aria-label="Memória anterior"
        disabled={activeIndex === 0}
        onClick={() => onSelect(activeIndex - 1)}
      >
        ←
      </button>
      <ol>
        {memories.map((memory, index) => (
          <li key={memory.id}>
            <button
              type="button"
              aria-label={`Abrir memória ${index + 1}: ${memory.title}`}
              aria-current={index === activeIndex ? "step" : undefined}
              onClick={() => onSelect(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <i />
            </button>
          </li>
        ))}
      </ol>
      <button
        type="button"
        aria-label="Próxima memória"
        disabled={activeIndex === memories.length - 1}
        onClick={() => onSelect(activeIndex + 1)}
      >
        →
      </button>
    </nav>
  );
}
