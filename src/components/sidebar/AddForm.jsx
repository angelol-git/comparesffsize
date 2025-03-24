import "./AddForm.css";

function handleSubmit(event) {
  event.preventDefault();
}

function AddForm() {
  return <form id="add-form" onSubmit={handleSubmit}></form>;
}

export default AddForm;
