import stylesHeader from './Header.module.css';

type HeaderProps = {
  onHelpClick: () => void;
};

const Header = ({onHelpClick}:HeaderProps) => {


  return (
    <header className={stylesHeader.headerWordle}>
      <h1>Wordle</h1>
      <button
        className={stylesHeader.buttonAide}
        type="button"
        onClick={onHelpClick}
        aria-label="Ouvrir l’aide"
      >
        ?
      </button>
    </header>
  );
};

export default Header;