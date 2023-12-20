import allowedOrigin from "./allowedOrigins.js";

const corsOption = {
  origin: (origin, cb) => {
    if (allowedOrigin.indexOf(origin) != -1 || origin) {
      cb(null, true);
    } else {
      cb(new Error("Not allowed by CORS"));
    }
  },
};

export default corsOption;
