import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

function Main(props) {
  const { saveNote, deleteNote, enableSide, getCurrentNote } = props;
  const { currentNote, note } = props;

  const [noteContent, setNoteContent] = useState("");
  const [date, setDate] = useState(Date.now());
  const [title, setTitle] = useState("");
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleChange = (value) => {
    setNoteContent(value);
  };

  const handleEdit = () => {
    setEditing(false);
    navigate(`/notes/${currentNote}/edit`); 
  };

  useEffect(() => {
    console.log(getCurrentNote().body);
    console.log(getCurrentNote().title);
    setNoteContent(getCurrentNote().body);
    setTitle(getCurrentNote().title);
  }, [currentNote]);

  const handleSaveNote = () => {
    console.log(typeof date);
    const note = {
      id: currentNote,
      title: document.getElementById("noteTopText").value,
      date: date,
      body: noteContent,
    };
    navigate(`/notes/${currentNote}`); 
    saveNote(note);
    setEditing(true);
  };


  return (
    <>
      <div
        id="mainBox"
        style={{
          overflowY: "scroll",
          height: "100vh",
          ...(enableSide ? { width: "100%" } : { width: "100%" }),
        }}
      >
        <div id="noteTop">
          <div id="leftTop">
            <input
              type="text"
              id="noteTopText"
              placeholder="Untitled"
              value={title}
              onChange={handleTitleChange}
              autoFocus
            ></input>

            <div id="currentDate">
              <input
                id="calendarbutton"
                type="datetime-local"
                defaultValue={new Date(note.date - 25200000)
                  .toISOString()
                  .slice(0, 19)}
                onChange={(e) => setDate(Date.parse(e.target.value))}
              />
            </div>
          </div>

          <div id="rightTop">
            {editing ? (
              <button onClick={handleEdit} id="editNote">
                Edit &#x270F;
              </button>
            ) : (
              <button onClick={handleSaveNote}  id="save">
                Save &#x1F5C4;
              </button>
            )}

            <button
              onClick={() => {
                const currentNote = getCurrentNote();
                if (currentNote) {
                  deleteNote(currentNote.id);
                }
              }}
              id="deleteNote"
            >
              Delete&#x1F5D1;
            </button>
          </div>
        </div>

        {!editing ? (
          <div id="noteEdit">
            <ReactQuill
              placeholder="Write here"
              value={noteContent}
              onChange={handleChange}
            ></ReactQuill>
          </div>
        ) : (<div id="newNoteContent" dangerouslySetInnerHTML={{__html: noteContent}}></div>)}
      </div>
    </>
  );
        }
export default Main;



        
