import { useState } from "react";
import API from "../services/api";

function CreateLead() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile_number: "",
    source: "",
    status: "New",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post("/leads/", formData);

      alert("Lead Created Successfully");

      window.location.reload();

    } catch (error) {

      console.log(error);

      alert("Error creating lead");
    }
  };

  return (

    <div className="card">

      <h2 style={{ marginBottom: "25px" }}>
        Create Lead
      </h2>

      <form onSubmit={handleSubmit}>

        <div className="form-grid">

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="text"
            name="mobile_number"
            placeholder="Mobile Number"
            value={formData.mobile_number}
            onChange={handleChange}
          />

          <input
            type="text"
            name="source"
            placeholder="Source"
            value={formData.source}
            onChange={handleChange}
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="New">New</option>
            <option value="In Progress">In Progress</option>
            <option value="Follow-up">Follow-up</option>
            <option value="Converted">Converted</option>
            <option value="Closed">Closed</option>
          </select>

        </div>

        <br />

        <button type="submit">
          Create Lead
        </button>

      </form>

    </div>
  );
}

export default CreateLead;
