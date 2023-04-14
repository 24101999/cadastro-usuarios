import React, { ChangeEvent, useState, useEffect } from "react";
import styles from "./Edit.module.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { type } from "os";

type Props = {};

type inputs = string;

interface d {
  nome?: string;
  email?: string;
  idade?: undefined;
}

const Edit = (props: Props) => {
  const [nome, setNome] = useState<inputs>("");
  const [img, setImg] = useState<File | null>();
  const [email, setEmail] = useState<inputs>("");
  const [idade, setIdade] = useState<inputs>("");
  const [dados, setDados] = useState<Array<d>>();
  const param = useParams();
  const id = param.id;
  const nav = useNavigate();
  useEffect(() => {
    axios
      .get(
        `https://henriquedeveloper.com.br/backend-cadastro/home/item.php?id=${id}`
      )
      .then((res) => {
        setDados(res.data);
      });
  }, []);
  const url = `https://henriquedeveloper.com.br/backend-cadastro/home/update.php?id=${id}`;

  const elemntos = {
    nome,
    email,
    idade,
    img,
  };

  const regEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const regEx = /^[a-z à-ú À-Ú]+$/i;
  const regExNum = /^[0-9]+$/i;

  const sub = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!nome || !img || !email || !idade) {
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
    axios.post(url, elemntos, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    nav("/home");
    alert("Editado com sucesso");
    if (!nome || !email || !idade || !img) {
      nav(`/edit/${id}`);
    }
  };

  return (
    <div className={styles.edit}>
      <h1>EDITAR</h1>
      <form onSubmit={sub}>
        <label>
          <span>Imagem</span>
          <input
            type="file"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (!e.target.files) return;
              setImg(e.target.files[0]);
            }}
          />
        </label>
        <label>
          <span>Nome</span>
          <input
            type="text"
            name=""
            placeholder={dados ? dados[0].nome : ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNome(e.target.value)
            }
          />
        </label>
        <label>
          <span>Email</span>
          <input
            type="text"
            name=""
            placeholder={dados ? dados[0].email : ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
        </label>
        <label>
          <span>Idade</span>
          <input
            type="text"
            name=""
            placeholder={dados ? dados[0].idade : ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setIdade(e.target.value)
            }
          />
        </label>
        <button type="submit">EDITAR</button>
      </form>
    </div>
  );
};

export default Edit;
