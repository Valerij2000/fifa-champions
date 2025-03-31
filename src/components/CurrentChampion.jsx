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
import Flag from "react-world-flags";

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

  if (!currentChampion) return <div>Загрузка...</div>;

  return (
    <Card className="mb-3">
      <Card.Header>Действующий Champion FIFA</Card.Header>
      <Card.Body>
        <Card.Title>{`${currentChampion.firstName} ${currentChampion.lastName}`}</Card.Title>
        <Card.Text>
          Страна: {currentChampion.country}
          <Flag
            code={currentChampion.country.toUpperCase()}
            size={24}
            className="img-flag"
          />
          <br />
          Дата: {currentChampion.date}
          <br />
          Чемпионат: {currentChampion.championship}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CurrentChampion;
