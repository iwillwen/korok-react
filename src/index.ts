import Korok from 'korok-core'
import { patch } from './util'

export function registerKorok(key: string) {
  function decorate<P>(component: React.StatelessComponent<P>): React.ComponentClass<P>
  function decorate<P, TFunction extends React.ComponentClass<P>>(component: TFunction): TFunction
  function decorate<P>(component: any) {

    const target = component.prototype || component
    const korok = new Korok(key)

    Object.defineProperty(target, 'korok', {
      get() {
        return korok
      }
    })

    patch(target, 'componentWillMount', function() {
      korok.setProps(this.props)
      korok.compose(() => {
        this.forceUpdate()
      })
    })
    patch(target, 'componentDidMount', () => {
      korok.dispatch()
    })
    
    Korok.register(key, component)
  
    return component
  }

  return decorate
}