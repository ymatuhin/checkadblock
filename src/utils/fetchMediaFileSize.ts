const allowedTypes = ["application/x-shockwave-flash", "image"];

export const fetchMediaFileSize = (url: string) =>
  fetch(url)
    .then(res => {
      const isOk = res.status >= 200 && res.status < 300;
      const contentType = res.headers.get("content-type");
      const acceptableType = allowedTypes.reduce(
        (acc, type) => (contentType.indexOf(type) === 0 ? true : acc),
        false,
      );
      if (!isOk) throw Error("Wrong status code");
      if (!acceptableType) throw Error("Wrong type response");
      return res;
    })
    .then(res => res.text())
    .then(text => text.length)
    .then(fileSize => {
      if (fileSize > 0) return fileSize;
      throw Error("unknown file size");
    });
