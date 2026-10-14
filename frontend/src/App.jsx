
import React, { useEffect, useState } from "react";

const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");

export default function App() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", category: "", price: "" });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("Loading items...");
  const [busy, setBusy] = useState(false);

  async function loadItems() {
    try {
      const response = await fetch(`${API_URL}/api/items`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Could not load items");
      setItems(data);
      setMessage(data.length ? "" : "No items yet. Add your first item.");
    } catch (error) {
      setMessage(`Could not connect to backend: ${error.message}`);
    }
  }

  useEffect(() => {
    loadItems();
  }, []);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function resetForm() {
    setForm({ name: "", category: "", price: "" });
    setEditingId(null);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    const isEditing = Boolean(editingId);

    try {
      const response = await fetch(
        isEditing ? `${API_URL}/api/items/${editingId}` : `${API_URL}/api/items`,
        {
          method: isEditing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, price: Number(form.price) })
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Request failed");
      resetForm();
      setMessage(isEditing ? "Item updated successfully." : "Item added successfully.");
      await loadItems();
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setBusy(false);
    }
  }

  function startEdit(item) {
    setEditingId(item._id);
    setForm({
      name: item.name,
      category: item.category,
      price: String(item.price)
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function deleteItem(id) {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      const response = await fetch(`${API_URL}/api/items/${id}`, { method: "DELETE" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Delete failed");
      setMessage("Item deleted successfully.");
      if (editingId === id) resetForm();
      await loadItems();
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  }

  return (
    <main className="container">
      <header>
        <p className="eyebrow">SE2020 · PRACTICE PROJECT</p>
        <h1>Item Manager</h1>
        <p className="subtitle">Create, view, update and delete items.</p>
      </header>

      <section className="panel">
        <h2>{editingId ? "Edit item" : "Add a new item"}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Item name
            <input name="name" value={form.name} onChange={handleChange}
              placeholder="e.g. Keyboard" required maxLength={100} />
          </label>
          <label>
            Category
            <input name="category" value={form.category} onChange={handleChange}
              placeholder="e.g. Accessories" required maxLength={100} />
          </label>
          <label>
            Price
            <input name="price" type="number" min="0" step="0.01" value={form.price}
              onChange={handleChange} placeholder="e.g. 2500" required />
          </label>
          <div className="actions">
            <button type="submit" disabled={busy}>{busy ? "Please wait..." : editingId ? "Save changes" : "Add item"}</button>
            {editingId && <button className="secondary" type="button" onClick={resetForm}>Cancel</button>}
          </div>
        </form>
        {message && <p className="message" role="status">{message}</p>}
      </section>

      <section className="panel">
        <div className="list-heading">
          <h2>Items</h2>
          <button className="secondary" type="button" onClick={loadItems}>Refresh</button>
        </div>
        {items.length === 0 ? (
          <p className="empty">Items will appear here after you add them.</p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>Name</th><th>Category</th><th>Price</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>{Number(item.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td className="row-actions">
                      <button className="secondary small" onClick={() => startEdit(item)}>Edit</button>
                      <button className="danger small" onClick={() => deleteItem(item._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
      <footer>React · Express · Node.js · MongoDB</footer>
    </main>
  );
}
