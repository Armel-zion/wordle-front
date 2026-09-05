import Section from '../Section/Section';
import mainStyles from "./Main.module.css";

const Main = () => {
  return (
    <main className={mainStyles.main}>
      <Section className={mainStyles.sectionGrid}>
        <p>Bienvenue sur Wordle, le jeu de devinettes de mots !</p>
      </Section>

      <Section className={mainStyles.sectionKeyboard}>
        <p>Utilisez le clavier ci-dessous pour deviner le mot secret.</p>
      </Section>
    </main>
  );
};

export default Main;