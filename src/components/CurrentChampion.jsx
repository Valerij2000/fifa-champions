import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";
import { FlagIcon } from "react-flag-kit";

const CurrentChampion = () => {
  const [currentChampion, setCurrentChampion] = useState(null);

  useEffect(() => {
    const q = query(
      collection(db, "champions"),
      orderBy("timestamp", "desc"),
      limit(1)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (!querySnapshot.empty) {
        setCurrentChampion({
          id: querySnapshot.docs[0].id,
          ...querySnapshot.docs[0].data(),
        });
      }
    });

    return () => unsubscribe();
  }, []);

  if (!currentChampion) return <div>Loading...</div>;

  return (
    <Card>
      <Card.Header>Current FIFA Champion</Card.Header>
      <Card.Body>
        <Card.Title>{`${currentChampion.firstName} ${currentChampion.lastName}`}</Card.Title>
        <Card.Text>
          Country: {currentChampion.country} <FlagIcon code="DE" size={24} />
          <FlagIcon code={currentChampion.country.toUpperCase()} size={24} />
          <br />
          Date: {currentChampion.date}
          <br />
          Championship: {currentChampion.championship}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CurrentChampion;
