import HelpModalStyle from './HelpModal.module.css';
import Section from '../Section/Section';

type HelpModalProps = {
    onClose : () => void;
}


const HelpModal = ({ onClose }: HelpModalProps) => {

    return (
        <div className={HelpModalStyle.overlay}>
            <Section
                className={HelpModalStyle.modal}
                role="dialog"
                aria-modal="true"
                aria-labelledby="help-modal-title"
            >
                <button
                    className={HelpModalStyle.closeButton}
                    type="button"
                    onClick={onClose}
                    aria-label="Fermer l'aide"
                >
                     ×
                </button>

                <h2 id="help-modal-title">Comment jouer à Wordle</h2>
                <p>Devinez le mot en 6 essais.</p>
                <ul>
                    <li>Entre un mot avec le clavier.</li>
                    <li>Valide ton mot avec la touche Entrée.</li>
                    <li>Les couleurs indiquent si les lettres sont bien placées.</li>
                </ul>
            </Section>
        </div>
    )
}

export default HelpModal;