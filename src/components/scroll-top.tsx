import { useEffect, useState } from 'react';
import { TbArrowUp } from 'react-icons/tb';
import clsx from 'clsx';

export const ScrollTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleScroll = () => (window.scrollY > 300 ? setIsVisible(true) : setIsVisible(false));

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <button
      className={clsx('scroll-top', isVisible && 'active')}
      type="button"
      title="Vissza az oldal tetejére"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <TbArrowUp size={24} color="white" />
    </button>
  );
};
