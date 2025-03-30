import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

const ChampionForm = () => {
  const [champion, setChampion] = useState({
    firstName: "",
    lastName: "",
    country: "",
    date: "",
    championship: "",
  });

  const handleChange = (e) => {
    setChampion({ ...champion, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "champions"), {
        ...champion,
        timestamp: new Date(),
      });
      setChampion({
        firstName: "",
        lastName: "",
        country: "",
        date: "",
        championship: "",
      });
      alert("Champion added successfully!");
    } catch (error) {
      console.error("Error adding champion: ", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-2">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          name="firstName"
          value={champion.firstName}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          name="lastName"
          value={champion.lastName}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Country</Form.Label>
        <Form.Control
          type="text"
          name="country"
          value={champion.country}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="date"
          name="date"
          value={champion.date}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-4">
        <Form.Label>Championship</Form.Label>
        <Form.Control
          type="text"
          name="championship"
          value={champion.championship}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Add Champion
      </Button>
    </Form>
  );
};

export default ChampionForm;
