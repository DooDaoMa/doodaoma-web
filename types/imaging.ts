export interface FilterWheelOption {
  position: number
  name: string
}

export interface IImagingForm {
  startSequence: {
    cooling: {
      temperature: number
      duration: number
    }
  }
  imagingSequence: {
    target: {
      name: string
      rotation: number
      ra: {
        hours: string
        minutes: string
        seconds: string
      }
      dec: {
        degrees: string
        minutes: string
        seconds: string
      }
    }
    tracking: {
      mode: 0 | 1 | 2 | 3 | 5
    }
    guiding: {
      forceCalibration: boolean
    }
    exposure: {
      gain: number
      time: number
      binning: string
      imageType: string
    }
  }
  endSequence: {
    warming: {
      duration: number
    }
  }
}

export const imagingFormDefaultValue: IImagingForm = {
  startSequence: {
    cooling: {
      temperature: -10,
      duration: 5,
    },
  },
  imagingSequence: {
    target: {
      name: '',
      rotation: 0,
      ra: {
        hours: '0',
        minutes: '0',
        seconds: '0',
      },
      dec: {
        degrees: '0',
        minutes: '0',
        seconds: '0',
      },
    },
    tracking: {
      mode: 0,
    },
    guiding: {
      forceCalibration: false,
    },
    exposure: {
      gain: 100,
      time: 300,
      binning: '1x1',
      imageType: 'LIGHT',
    },
  },
  endSequence: {
    warming: {
      duration: 5,
    },
  },
}

export const blackPlaceholderUrl =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII='
