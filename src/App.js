import { useState, useEffect } from "react";
import Side from "./Side";
import Main from "./Main";
import { useNavigate } from "react-router-dom";

function App() {
  const [noteList, setNoteList] = useState(
    localStorage.noteList ? JSON.parse(localStorage.noteList) : []
  );

  const [currentNote, setCurrent] = useState(false);
  const [newNote, setnewNote] = useState(false);
  const [enableSide, setEnableSide] = useState(true);
  const [mainWidth, setMainWidth] = useState("100%");
  const [text, setText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.noteList) {
      localStorage.setItem("noteList", "[]");
    }
    setNoteList(JSON.parse(localStorage.noteList));
  }, []);

  useEffect(() => {
    localStorage.setItem("noteList", JSON.stringify(noteList));
  }, [noteList]);


  const saveNote = (updatedNote) => {
    const updatedNotesArr = noteList.map((note) => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      } else {
        return note;
      }
    });

    setNoteList(updatedNotesArr);
  };

  const textChange = (bodyText) => {
    setText(bodyText);
  };

  const addNote = () => {
    const newNote = {
      id: noteList.length + 1,
      title: "Untitled Note",
      body: "",
      date: new Date().getTime(),
    };
    setNoteList([newNote, ...noteList]);
    setnewNote(true);
  };

  const deleteNote = (noteId) => {
    const answer = window.confirm("Are you sure you want to delete this note?");
    if (!answer) return;
  
    const newNoteList = noteList.filter((note) => note.id !== noteId);
    localStorage.removeItem(currentNote.id);
    setNoteList(newNoteList);
  
    const currentIndex = noteList.findIndex((note) => note.id === noteId);
    const nextNoteIndex = currentIndex === 0 ? 1 : currentIndex - 1;
    let nextNoteId;
    if (newNoteList.length > 0) {
      if (nextNoteIndex === newNoteList.length) {
        nextNoteId = newNoteList[0].id;
      } else {
        nextNoteId = newNoteList[nextNoteIndex].id;
      }
    } else {
      navigate(`/notes`);
      return;
    }
    setCurrent(nextNoteId);
    navigate(`/notes/${nextNoteId}/edit`);
  };


  function toggle() {
    setEnableSide(!enableSide);
    setMainWidth(enableSide ? "83%" : "100%");
  }
  

  function getCurrentNote() {
    return noteList.find((note) => note.id === currentNote); //strict comparison 
  }

  return (
    <>
      <div id="topofPage">
        <div id="title">Lotion</div>
        <div id="subTitle">Like Notion..</div>
        <div id="icon">
          <button id="enableSide" onClick={toggle}>
            &#9776;
          </button>
        </div>
      </div>
      <div id="middle">
        {enableSide && (
          <Side
            noteList={noteList}
            addNote={addNote}
            currentNote={currentNote}
            setCurrent={setCurrent}
            newNote={newNote}
            textChange={textChange}
            text={text}
          ></Side>
        )}
        {noteList.map(
          (note) =>
            note.id === currentNote && (
              <Main
                note={note}
                key={note.id}
                noteList={noteList}
                deleteNote={deleteNote}
                getCurrentNote={getCurrentNote}
                saveNote={saveNote}
                newNote={newNote}
                enableSide={enableSide}
                currentNote={currentNote}
              ></Main>
            )
        )}

      {((!newNote && noteList.length > 0 && !currentNote) || noteList.length === 0) && (
          <div
            id="mainBox"
            style={enableSide ? { width: "80%" } : { width: "100%" }}>
            <div id="mainNoteMessage">Select a note or create a new one</div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
