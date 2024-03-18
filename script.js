document.addEventListener('DOMContentLoaded', function () {
    const notesContainer = document.querySelector('.notes-container');
    const addNoteBtn = document.querySelector('.add-note-btn');
    const downloadBtn = document.querySelector('.download-btn');

    addNoteBtn.addEventListener('click', function () {
        const noteDiv = document.createElement('div');
        noteDiv.classList.add('note');
        noteDiv.innerHTML = `
            <textarea placeholder="Write your note here..."></textarea>
            <div class="actions">
                <button class="delete-btn"><i class="fas fa-trash-alt"></i></button>
            </div>
        `;
        notesContainer.appendChild(noteDiv);
    });

    notesContainer.addEventListener('click', function (e) {
        if (e.target.classList.contains('delete-btn')) {
            e.target.closest('.note').remove();
        }
    });

    downloadBtn.addEventListener('click', function () {
        const notes = document.querySelectorAll('.note textarea');
        const content = [];
        notes.forEach(function (note, index) {
            content.push(`Note ${index + 1}: ${note.value}`);
        });

        const blob = new Blob([content.join('\n')], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'notes.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
});
