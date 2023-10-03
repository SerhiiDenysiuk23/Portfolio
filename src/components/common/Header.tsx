import React from 'react';

const Header = () => {
  const [isScroll, setIsScroll] = React.useState(false)
  const elementRef = React.useRef<HTMLHeadingElement>(null);
  const initialTop = 90
  const initialTopM = 50

  const [isNavExpanded, setIsNavExpanded] = React.useState(false)

  const handleToggleMenu = () => {
    setIsNavExpanded(prevState => !prevState)
  }

  React.useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) {
        return
      }
      const isMobile = window.screen.width < 557
      if (window.scrollY > initialTop && !isMobile) {
        setIsScroll(true)
      } else if (window.scrollY > initialTopM && isMobile) {
        setIsScroll(true)
      } else {
        setIsScroll(false)
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [initialTop]);

  return (
    <header ref={elementRef} className={`container ${isScroll ? "fixed" : ""}`}>
      <nav>
        <div className="logo"><a href="#">Portfolio</a></div>
        <ul className={"main-nav"}>
          <li><a href="#">About me</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contacts">Contacts</a></li>
        </ul>
        <div onClick={handleToggleMenu} className={`burger-menu ${isNavExpanded ? "burger-menu__active" : ""}`}>
          <div/>
          <div/>
          <div/>
        </div>

        {
          isNavExpanded &&
          <ul className={"expanded-nav"}>
            <li><a href="#">About me</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contacts">Contacts</a></li>
          </ul>
        }
      </nav>
    </header>
  );
};

export default Header;