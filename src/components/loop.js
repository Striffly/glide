import { define } from '../utils/object'

export default function (Glide, Components, Events) {
  const Loop = {
    mount () {
      if (Glide.settings.loop) {
        this.setup()
      }
    },

    setup () {
      Components.Build.positioning()

      if (Glide.index < Glide.settings.perView) {
        this.setEndSlides()
      } else if (Glide.index > Components.Run.length - Glide.settings.perView) {
        this.setStartSlides()
      }
    },

    setEndSlides() {
      let { slideWidth } = Components.Sizes

      this.slidesEnd.forEach((slide, i) => {
        slide.style.left = `-${(slideWidth * (i + 1)) + (Components.Gaps.value * (i + 1))}px`
      })
    },

    setStartSlides() {
      let { slideWidth } = Components.Sizes

      this.slidesStart.forEach((slide, i) => {
        slide.style.left = `${(slideWidth * (i + 1 + Components.Run.length)) + (Components.Gaps.value * (i + 1 + Components.Run.length))}px`
      })
    },
  }

  define(Loop, 'number', {
    get () {
      let { focusAt, perView } = Glide.settings

      if (focusAt === 'center') {
        return perView + Math.floor(perView / 2)
      }

      return perView + focusAt
    }
  })

  define(Loop, 'slidesEnd', {
    get () {
      return Components.Html.slides.slice(`-${Loop.number}`).reverse()
    }
  })

  define(Loop, 'slidesStart', {
    get () {
      return Components.Html.slides.slice(0, (Loop.number - 1))
    }
  })

  Events.on('move', () => {
    Loop.setup()
  })

  return Loop
}
