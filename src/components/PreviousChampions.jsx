import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";
import Flag from "react-world-flags";

const PreviousChampions = () => {
  const [previousChampions, setPreviousChampions] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "champions"),
      orderBy("timestamp", "desc"),
      limit(6)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const champions = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPreviousChampions(champions.slice(1)); // Exclude the current champion
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h3>Previous Champions</h3>
      <ListGroup>
        {previousChampions.map((champion) => (
          <ListGroup.Item key={champion.id}>
            {`${champion.firstName} ${champion.lastName}`} - {champion.country}{" "}
            <Flag
              code={champion.country.toUpperCase()}
              size={16}
              className="img-flag"
            />
            <br />
            {champion.championship} ({champion.date})
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default PreviousChampions;
