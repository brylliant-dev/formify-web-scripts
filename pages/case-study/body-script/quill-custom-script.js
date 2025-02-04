const quill = new Quill('#editor', {
    modules: {
        toolbar: [
             [{ 'header': [2, 3, 4, 5, 6, false] }],
        
           ['bold', 'italic', 'underline', 'strike'],
           ['blockquote', 'code-block', 'link'],

           
           [{ 'list': 'ordered'}, { 'list': 'bullet' }],

           ['clean']
       ]
    },
  placeholder: 'You can start typing here...',
  theme: 'snow'
});

const quillFormId = '#wf-form-Case-Study'

const quillForm = document.querySelector(quillFormId);
quillForm.onsubmit = function() {
  // Populate hidden form on submit
  const about = document.querySelector('textarea[name=description]');
  about.value = quill.root.innerHTML;
 
  
  console.log("Submitted", $(quillForm).serialize(), $(quillForm).serializeArray());
  
  // No back end to actually submit to!

  return false;
};
