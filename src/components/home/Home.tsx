import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./Home.module.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { type } from "os";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import img from "../../logo.svg";
import Insert from "../admin/insert/Insert";
import Modal from "./Modal";

type Props = {
  val?: string;
  // a?: number | boolean;
};
interface valores {
  id?: number;
  nome?: string;
  email?: string;
  idade?: number;
}

type p = number | string | undefined;

const Home = ({ val }: Props) => {
  const param = useParams();
  let x: p = param.id;
  const n: p = x ? +x : 0;

  const [valor] = useState<boolean | string | null>(
    sessionStorage.getItem("val")
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [dados, setDados] = useState<Array<valores>>();
  const [id, setId] = useState<number | undefined | string>(n);
  const [scarch, setScarch] = useState("");
  const [modal, setModal] = useState(styles.insertN);
  const [modalDel, setModalDel] = useState(styles.delN);
  const scLower = scarch.toLocaleLowerCase();
  const user = dados?.filter((us) =>
    us.nome?.toLocaleLowerCase().includes(scLower ? scLower : "")
  );
  const y: p = dados?.length;

  const nav = useNavigate();
  useEffect(() => {
    axios
      .get("https://henriquedeveloper.com.br/backend-cadastro/home")
      .then((res) => {
        setDados(res.data);
      });
    if (!valor) {
      nav("/");
    }
  }, []);

  const get = () => {
    setTimeout(() => {
      axios
        .get("https://henriquedeveloper.com.br/backend-cadastro/home")
        .then((res) => {
          setDados(res.data);
        });
    }, 300);
  };

  const open = () => {
    setModal(styles.insert);
  };

  const closs = () => {
    setModal(styles.insertN);
  };

  const opModal = (e: number | undefined) => {
    setModalDel(styles.del);
    setId(e);
  };

  const closeModal = () => {
    setModalDel(styles.delN);
  };

  const deletar = () => {
    axios.delete(
      `https://henriquedeveloper.com.br/backend-cadastro/home/delete.php?id=${id}`
    );
    get();
    closeModal();
  };

  return (
    <>
      <Modal md={modalDel} cl={closeModal} del={deletar} />
      <Insert md={modal} cl={closs} reload={get} />
      <div className={styles.elements}>
        {!valor ? (
          ""
        ) : (
          <div className={styles.dados}>
            <label>
              <span>
                <strong>Buscar usuario pelo nome</strong>
              </span>
              <input
                className={styles.inputPes}
                type="search"
                value={scarch}
                onChange={(e) => setScarch(e.target.value)}
              />
            </label>
            <button onClick={open}>ADICIONAR USUARIO</button>
            {user
              ? user.map((d: valores) => {
                  return (
                    <div key={d.id} className={styles.dado}>
                      <div className={styles.inpinfo}>
                        <div className={styles.text}>
                          <p>{d.nome}</p>
                        </div>

                        <div className={styles.buttons}>
                          <button
                            style={{ color: "green" }}
                            onClick={() => nav(`/edit/${d.id}`)}
                            type="button"
                          >
                            <AiFillEdit />
                          </button>
                          <button
                            style={{ color: "red" }}
                            onClick={() => opModal(d.id)}
                            typeof="button"
                          >
                            <AiFillDelete />
                          </button>
                        </div>
                      </div>
                      <button onClick={() => nav(`/dado/${d.id}`)}>
                        Dados completos
                      </button>
                    </div>
                  );
                })
              : ""}
            {/* {dados?.length === 0 ? setLoading(true) : ""} */}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
