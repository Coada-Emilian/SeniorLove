In order to use **Multer**, I have installed Multer via pnpm using:

```bash
pnpm i multer
```

I then created a test form on the front-end that directs to "http://localhost:4000/test" with a POST method and, most crucially, **encType="multipart/form-data"**.

On the back-end, for clarity, I created a Multer router and a Multer controller for tests.

**Multer Router** <br>
In the multerRouter.js file, I added the following line:

```javascript
multerRouter.post('/test', upload.single('image'), multerController.testMulter);
```

I imported Multer via:

```javascript
import multer from 'multer';
```

Then, I declared a local folder for uploads (this is optional):

```javascript
const upload = multer({ dest: 'uploads/' });
```

**Multer Controller** <br>
In the multerController.js file, I declared the following function that checks if the form is able to send file details when it's submitted. The response should look like:

```json
{
  "message": "File uploaded successfully",
  "file": {
    "fieldname": "image",
    "originalname": "ghosts-hugging-walkway-park.jpg",
    "encoding": "7bit",
    "mimetype": "image/jpeg",
    "destination": "uploads/",
    "filename": "237abf9a9949d55ca562ae0c4110076b",
    "path": "uploads\\237abf9a9949d55ca562ae0c4110076b",
    "size": 8806747
  }
}
```

**Using Cloudinary**<br>
In order to upload photos somewhere on the internet and just get they're url's back i have used Cloudinary, a free service which requires an account.

I've passed my Cloudinary cloud name, key and secret in thr .env file.

We can find and install via pnpm Multer Storage Cloudinary & Cloudinary.

```bash
pnpm i cloudinary multer-storage-cloudinary
```

Created Cloudinary folder with an index.js inside where import cloudinary, multer-storage-cloudinary and multer.

We config cloudinary to have our credentials and create a new storage where we add the cloudinary instance we created, we can set a folder on cloudinary for our photos and even choose the accepted formats.

```js
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  folder: 'multer_test',
  allowedFormats: ['jpg', 'png', 'webp'],
});

// Initialize Multer with Cloudinary storage
const upload = multer({ storage: storage });

export { cloudinary, upload };
export default storage;
```

Once this is done we can go back to our router, import the storage and change the private folder with a cloudinary one.

```js
import storage from '../cloudinary/index.js';

const upload = multer({ storage });
```

Now if we resubmit the form we should have a result similar to this

```json
{
  "message": "File uploaded successfully",
  "file": {
    "fieldname": "image",
    "originalname": "ghosts-hugging-walkway-park.jpg",
    "encoding": "7bit",
    "mimetype": "image/jpeg",
    "path": "https://res.cloudinary.com/dyexhzu04/image/upload/v1726076547/multer_test/iv2bgehxqaivok2gltz5.jpg",
    "size": 8806747,
    "filename": "multer_test/iv2bgehxqaivok2gltz5"
  }
}
```

We will need to store in the database the path and the filename in order to use them for display purposes.

For that we need to update the user model so that it accepts a **picture_url** and a **picture_filename**.

We then need to go back to our controller and update our function so that we can set the the **req.file.path** to **user.picture_url** and **req.file.filename** to **user.picture_filename**.
