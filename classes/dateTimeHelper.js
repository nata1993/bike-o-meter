// This class is a helper class for providing timestamps for logging purporses in the terminal view

function CurrentTime() {
  let dateTime = new Date();
  let day = dateTime.getDate();
  let month = dateTime.getMonth();
  let year = dateTime.getFullYear();
  let hour = dateTime.getHours();
  let minutes = dateTime.getMinutes();
  let seconds = dateTime.getSeconds();
  
  let CurrentTime = `${day}.${month}.${year} ${hour}:${minutes}:${seconds}`;

  return CurrentTime;
}


export default CurrentTime();