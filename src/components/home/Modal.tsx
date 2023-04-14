import React from "react";
import styles from "./Modal.module.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
interface Props {
  md?: string;
  cl?: () => void;
  del?: () => void;
}

const Modal = ({ md, cl, del }: Props) => {
  return (
    <div className={md}>
      <button className={styles.close} onClick={cl}>
        <AiOutlineCloseCircle />
      </button>
      <h1>Tem certeza ?</h1>
      <div className={styles.buttonsDel}>
        <button className={styles.bt1} style={{}} onClick={del}>
          Sim
        </button>
        <button className={styles.bt2} onClick={cl}>
          Não
        </button>
      </div>
    </div>
  );
};

export default Modal;
