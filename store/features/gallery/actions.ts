import { fetchAccountImages } from '../../../services/apis'
import createAsyncThunk from '../../middleware/customCreateThunk'

export const fetchMyImages = createAsyncThunk({
  api: fetchAccountImages,
  EVENT_NAME: 'gallery/fetchMyImages',
})
