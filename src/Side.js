import { useEffect } from "react";
import { useParams, Link} from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function Side({
  newNote,
  currentNote,
  addNote,
  setCurrent,
  noteList,
}) {
  const { noteId } = useParams();

  const formatDate = (when) => {
    const formatted = new Date(when).toLocaleString("en-US", options);
    if (formatted === "Invalid Date") {
      return "";
    }
    return formatted;
  };

  useEffect(() => {
    const index = Number(noteId) - 1;
    if (index >= 0) {
      setCurrent(noteList[index].id);
    }
  }, [setCurrent, noteList, useParams]);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };


  if ((!newNote && noteList.length == 0) || noteList.length == 0) {
    return (
      <div id="sideBox">
        <div id="sideTitle">
          &nbsp;Notes
          <button onClick={addNote} id="addNote">
            +
          </button>
        </div>
        <div id="sideNoteMessage">Add a note with +</div>
      </div>
    );
  }

  return (
    <>
      <div id="sideBox">
        <div id="sideTitle">
          &nbsp;Notes
          <button onClick={addNote} id="addNote">
            +
          </button>
        </div>

        <div
          id="noteListContainer"
          style={{ overflowY: "scroll", height: "100vh" }}
        >
          {noteList.slice(0).reverse().map((note) => (
            <Link to={`/notes/${note.id}/edit`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div
              key={note.id}
              className={`sideData ${note.id == currentNote && "active"}`}
              onClick={() => {
                setCurrent(note.id);
              }}
            >
              <div id="noteName">{note.title}</div>
              <div id="datetime">{formatDate(note.date)}</div>
              <ReactQuill
                readOnly={true}
                id="sideBody"
                modules={{ toolbar: false }}
                value={note.body.slice(0, 50) + "..."}
              ></ReactQuill>
            </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Side;