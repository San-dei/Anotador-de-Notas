"use client";
import React, { useState, useEffect } from "react";
import styles from "../src/app/page.module.css";

export default function Note() {
  const [texto, setTexto] = useState("");
  const [tarea, setTarea] = useState([]);

  useEffect(() => {
    localStorage.setItem("texto", JSON.stringify(tarea));
  }, [tarea]);

  useEffect(() => {
    const obtenerDatos = localStorage.getItem("texto");
    if (obtenerDatos) {
      setTarea(JSON.parse(obtenerDatos));
    }
  }, []);

  const agregarNota = () => {
    setTarea([...tarea, { texto, completado: false }]);
    setTexto("");
  };

  const eliminarNota = (texto) => {
    setTarea(tarea.filter((x) => x.texto !== texto));
    alert("Has eliminado una nota");
  };

  const marcarCompletado = (texto) => {
    setTarea((prevTarea) =>
      prevTarea.map((t) => {
        if (t.texto === texto) {
          return { ...t, completado: !t.completado };
        }
        return t;
      })
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.gradient_container}>
        <div className={styles.order}>
          <input
            type="text"
            value={texto}
            placeholder={texto.length === 0 ? "Agregar una Nota" : null}
            onChange={(e) => {
              setTexto(e.target.value);
            }}
            className={styles.note_input}
          />

          <button
            onClick={texto.length > 0 ? agregarNota : null}
            className={styles.note_button}
          >
            {texto.length > 0 ? "Agregar ✓" : "Agregar ✓"}
          </button>

          {tarea.length > 0 && (
            <div>
              {tarea.map((t, li) => {
                return (
                  <ul key={`id_${li}`} className={styles.note_list}>
                    <li className={styles.note_item}>
                      <input
                        type="checkbox"
                        checked={t.completado}
                        onChange={() => marcarCompletado(t.texto)}
                        className={styles.note_checkbox}
                      />
                      <span
                        className={
                          t.completado
                            ? `${styles.note_text} ${styles.completado}`
                            : styles.note_text
                        }
                      >
                        {t.texto}
                      </span>
                      <button
                        onClick={() => eliminarNota(t.texto)}
                        className={styles.note_delete_button}
                      >
                        ✕
                      </button>
                    </li>
                  </ul>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
