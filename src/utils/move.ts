import * as fs from 'fs-extra';

export default (oldPath, newPath, callback?) => {
  return fs.rename(oldPath, newPath).then((err) => {
    if (err) {
      if (err.code === 'EXDEV') {
        copy();
      } else {
        callback(err);
      }
      return;
    }
    callback();
  });

  function copy() {
    const readStream = fs.createReadStream(oldPath);
    const writeStream = fs.createWriteStream(newPath);

    readStream.on('error', callback);
    writeStream.on('error', callback);

    readStream.on('close', () => {
      fs.unlink(oldPath, callback);
    });

    return readStream.pipe(writeStream);
  }
};
