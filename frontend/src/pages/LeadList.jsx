import { useEffect, useState } from "react";
import API from "../services/api";

function LeadList() {

  const [leads, setLeads] = useState([]);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

  const [page, setPage] = useState(1);

  const fetchLeads = async () => {

    try {

      let url = `/leads/?page=${page}&limit=5`;

      if (search) {
        url += `&search=${search}`;
      }

      if (status) {
        url += `&status=${status}`;
      }

      const response = await API.get(url);

      setLeads(response.data.data);

    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, status) => {

    try {

      await API.put(`/leads/${id}`, {
        status: status,
      });

      fetchLeads();

    } catch (error) {

      console.log(error);

      alert("Status update failed");
    }
  };

  const deleteLead = async (id) => {

    try {

      await API.delete(`/leads/${id}`);

      alert("Lead Deleted");

      fetchLeads();

    } catch (error) {

      console.log(error);

      alert("Delete Failed");
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [page]);

  return (

    <div className="container">
  <div className="card">

      <h1>Lead Management System</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      &nbsp;&nbsp;

      {/* Status Filter */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">All Status</option>
        <option value="New">New</option>
        <option value="In Progress">In Progress</option>
        <option value="Follow-up">Follow-up</option>
        <option value="Converted">Converted</option>
        <option value="Closed">Closed</option>
      </select>

      &nbsp;&nbsp;

      <button onClick={fetchLeads}>
        Search
      </button>

      <br /><br />

      <table border="1" cellPadding="10" width="100%">

        <thead>

          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Status</th>
            <th>Action</th>
          </tr>

        </thead>

        <tbody>

          {leads.map((lead) => (

            <tr key={lead.id}>

              <td>{lead.name}</td>

              <td>{lead.email}</td>

              <td>{lead.mobile_number}</td>

              <td>

                <select
                  value={lead.status}
                  onChange={(e) =>
                    updateStatus(lead.id, e.target.value)
                  }
                >
                  <option value="New">New</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Follow-up">Follow-up</option>
                  <option value="Converted">Converted</option>
                  <option value="Closed">Closed</option>
                </select>

              </td>

              <td>

                <button
                  onClick={() => deleteLead(lead.id)}
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      <br />

      {/* Pagination */}
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        Previous
      </button>

      &nbsp;&nbsp;

      <span>
        Page {page}
      </span>

      &nbsp;&nbsp;

      <button
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
     </div>
    </div>
  );
}

export default LeadList;
