import { useState, useEffect, useRef } from 'react';

export const TableOfContent: React.FC = () => {
  const [activeHeading, setActiveHeading] = useState<string | null>();
  const observer = useRef<IntersectionObserver>();

  const headings = Array.from(document.querySelectorAll('h2, h3, h4, h5, h6'))
    .filter((element) => element.id)
    .map((element) => ({
      id: element.id,
      text: element.textContent,
      level: Number(element.tagName.slice(1)),
    }));

  useEffect(() => {
    const elements = headings.map(({ id }) => document.getElementById(id));

    observer.current?.disconnect();

    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry?.isIntersecting) setActiveHeading(entry.target.id);
        });
      },
      { rootMargin: '0% 0% -85% 0%' },
    );

    elements.forEach((element) => {
      if (element) observer.current?.observe(element);
    });

    return () => observer.current?.disconnect();
  }, [headings]);

  return (
    <aside style={{ position: 'sticky', top: '2rem' }}>
      <h2 className="fs-3">Tartalom</h2>
      <ul>
        {headings.map(({ id, text, level }) => (
          <li key={id} style={{ marginLeft: `${(level - 2) * 1.25}rem` }}>
            <a
              href={`#${id}`}
              className="text-black link link-reverse"
              style={{
                fontSize: '0.925rem',
                fontWeight: activeHeading === id ? 'bold' : 'normal',
              }}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
};
