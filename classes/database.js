// Imports for local classes
import CurrentTime from '../classes/dateTimeHelper.js';

// Imports for modules from nmp
import sqlite3 from 'sqlite3';
sqlite3.verbose();

const databaseName = './db/bike-o-meter-sqlite3.db';
//const databaseName = ':memory:';

var db;

export default class DB {
  
}