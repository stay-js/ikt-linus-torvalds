export const TableOfContent: React.FC = () => {
  const headings = Array.from(document.querySelectorAll('h2, h3, h4, h5, h6'))
    .filter((element) => element.id)
    .map((element) => ({
      id: element.id,
      text: element.textContent,
      level: Number(element.tagName.slice(1)),
    }));

  return (
    <aside>
      <h2 className="fs-3">Tartalom</h2>

      <ul>
        {headings.map(({ id, text, level }) => (
          <li key={id} style={{ marginLeft: `${level - 2}rem` }}>
            <a
              href={`#${id}`}
              className="text-black link link-reverse"
              style={{ fontSize: '0.925rem' }}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
};
