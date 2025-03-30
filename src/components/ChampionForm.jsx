import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import Select from "react-select";
import Flag from "react-world-flags";
import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

countries.registerLocale(en);

const ChampionForm = () => {
  const [champion, setChampion] = useState({
    firstName: "",
    lastName: "",
    country: "",
    date: "",
    championship: "",
  });

  const [countryOptions, setCountryOptions] = useState([]);

  useEffect(() => {
    const countryObj = countries.getNames("en", { select: "official" });
    const countryArr = Object.entries(countryObj).map(([code, name]) => ({
      label: name,
      value: code,
    }));
    setCountryOptions(countryArr);
  }, []);

  const handleChange = (e) => {
    setChampion({ ...champion, [e.target.name]: e.target.value });
  };

  const handleCountryChange = (selectedOption) => {
    setChampion({ ...champion, country: selectedOption.value });
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
      toast.success("Champion added successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      toast.error("Failed to add champion. Please try again.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
      padding: 10,
    }),
    singleValue: (provided, state) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
    }),
  };

  const formatOptionLabel = ({ value, label }) => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Flag code={value} height="16" style={{ marginRight: "10px" }} />
      <span>{label}</span>
    </div>
  );

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
        <Select
          options={countryOptions}
          styles={customStyles}
          formatOptionLabel={formatOptionLabel}
          onChange={handleCountryChange}
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
      <ToastContainer />
    </Form>
  );
};

export default ChampionForm;
