
import React, { useState, useEffect } from 'react';

// === IndexedDB Utilities === //
const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("TodoDB", 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("todos")) {
        db.createObjectStore("todos", { keyPath: "id" });
      }
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = () => reject(request.error);
  });
};

const saveTodoToDB = async (todo) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("todos", "readwrite");
    const store = tx.objectStore("todos");
    store.put(todo);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
};

const loadTodosFromDB = async () => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("todos", "readonly");
    const store = tx.objectStore("todos");
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

const deleteTodoFromDB = async (id) => {
  const db = await openDB();
  const tx = db.transaction("todos", "readwrite");
  const store = tx.objectStore("todos");
  store.delete(id);
};
export { openDB, loadTodosFromDB, saveTodoToDB, deleteTodoFromDB };