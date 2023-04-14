import { ChangeEvent, useState } from "react";
import styles from "./Insert.module.css";
import axios from "axios";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { render } from "@testing-library/react";

interface Props {
  md: string;
  cl: () => void;
  reload: () => void;
}

type i = string | undefined;

const Insert = ({ md, cl, reload }: Props) => {
  const [nome, setNome] = useState<i>("");
  const [img, setImg] = useState<File | null>();
  const [email, setEmail] = useState<i>("");
  const [idade, setIdade] = useState<string>("");
  const [msg, setMsg] = useState<string>("");
  const [modal, setModal] = useState(styles.insertN);
  // const url = "https://henriquedeveloper.com.br/backend-cadastro/home/insert.php";
  const url =
    "https://henriquedeveloper.com.br/backend-cadastro/home/insert.php";
  const dados = {
    nome,
    email,
    idade,
    img,
  };

  const regEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const regEx = /^[a-z à-ú À-Ú]+$/i;
  const regExNum = /^[0-9]+$/i;
  const handImg = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    // setImg(files?.item(0)?.name);
    console.log(img);
  };
  const sub = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!nome || !img || !email || !idade) {
      setMsg("campo vazio");
      return;
    } else if (!regEx.test(nome)) {
      alert("Isso não é um nome");
      return;
    } else if (!regEmail.test(email)) {
      alert("Tipo de email incorreto");
      return;
    } else if (!regExNum.test(idade)) {
      alert("Só é valido numero");
      return;
    }
    axios.post(url, dados, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    setEmail("");
    setNome("");
    setIdade("");
    cl();
    reload();
    alert("Cadastrado com sucesso");
  };

  return (
    <div className={md}>
      <button className={styles.close} onClick={cl}>
        <AiOutlineCloseCircle />
      </button>
      <h1>Cadastro</h1>
      <form onSubmit={sub}>
        <label>
          <span>Imagem</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (!e.target.files) return;
              setImg(e.target.files[0]);
              console.log(img);
            }}
          />
        </label>
        <label>
          <span>nome</span>
          <input
            placeholder={msg}
            type="text"
            value={nome}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNome(e.target.value)
            }
          />
        </label>
        <label>
          <span>email</span>
          <input
            placeholder={msg}
            type="text"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
        </label>
        <label>
          <span>idade</span>
          <input
            placeholder={msg}
            type="text"
            value={idade}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setIdade(e.target.value)
            }
          />
        </label>
        <button type="submit">cadastrar</button>
      </form>
    </div>
  );
};

export default Insert;
