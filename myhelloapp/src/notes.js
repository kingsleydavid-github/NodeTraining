const fs = require('fs');

const writeNotes = function writeNotes(txt) {
    return "Hi " + txt + " !, Your notes";
}

const addNote = function addNote(title, body) {
    const notes = loadNotes();
    notes.push({
        title: title,
        body: body
    });
    saveNotes(notes);
}

// stringify json and save
const saveNotes = function(notes){
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync("notes.json", dataJSON); 
}

//returns JSON array
const loadNotes = function() {
    try
    {
        const databuffer = fs.readFileSync( 'notes.json');
        const dataJson = databuffer.toString();
        return JSON.parse(dataJson);
    }
    catch(e)
    {
        return [];
    }
}

const removeNote = function(title) {
    const notes = loadNotes();
    duplicateNotes = notes.filter(function(note) {
        if(note.title === title)
        {
            return false;
        }
    });

    saveNotes(notes);

}

module.exports = {
    writeNotes : writeNotes,
    addNote : addNote,
    removeNote: removeNote
};