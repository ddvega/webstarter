import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`.yellow.bold);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

// export const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(`mongodb://mongodb:27017/${process.env.APP_NAME}`, {
//       useNewUrlParser: true,
//     });
//     console.log(`MongoDB Connected: ${conn.connection.host}`.yellow.bold);
//   } catch (error) {
//     console.error(`Error: ${error.message}`.red.underline.bold);
//     process.exit(1);
//   }
// };
