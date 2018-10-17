import React from 'react'
import { Link } from 'react-router-dom'
import './index.scss'
import Icon from '@hi-ui/hiui/es/icon'

class Sider extends React.Component {
  state = {
    ctrls: {},
    active: '',
    collapse: false
  }

  LOCK = false

  componentDidMount () {
    let { current, sider } = this.props
    const { items = [] } = sider
    current = current || (items[0] ? items[0].key : '')

    this.setState({active: current})
  }

  getClickElement (dom) {
    if (dom.nodeName === 'SPAN' && [].slice.call(dom.classList).indexOf('sider-list-item') > -1) {
      return dom.nextSibling
    } else {
      const parent = dom.parentNode
      return this.getClickElement(parent)
    }
  }

  toggleSlide (el, isClose, func, lock) {
    if (!isClose) {
      el.style.display = 'block'
      el.style.height = 0
    }
    const maxDelay = 300
    const height = el.scrollHeight
    const speed = Math.max(height / maxDelay, 0.5)
    let sum = 0

    let start = null
    const animate = timestamp => {
      if (!start) start = timestamp
      const progress = timestamp - start
      sum = progress * speed
      el.style.height = `${isClose ? height - sum : sum}px`
      if (height < sum) {
        if (isClose) {
          el.style.display = 'none'
        }
        el.style.height = ''
        func && func()
        lock && (this.LOCK = false)
      } else {
        window.requestAnimationFrame(animate)
      }
    }
    window.requestAnimationFrame(animate)
  }

  renderNavs (items, parent) {
    let {
      ctrls,
      active,
      collapse,
      prev
    } = this.state

    return (
      <ul className={`sider-list`}>
        {
          items.map((v, i) => (
            <li
              key={i}
              // className={`${ctrls[v.key] ? 'open' : ''}`}
            >
              {
                v.to
                  ? (
                    <Link
                      className={`sider-list-item ${active === v.key ? 'active' : ''}${v.noaction ? ' noaction' : ''}`}
                      to={v.to}
                      onClick={e => {
                        const open = !ctrls[v.key]
                        ctrls = {}
                        ctrls[v.key] = open
                        if (parent) {
                          ctrls[parent] = open
                        }
                        active = v.key

                        this.setState({ctrls, active})
                      }}
                    >
                      {
                        v.icon
                          ? (<span className='sider-list-icon'>{v.icon}</span>)
                          : ''
                      }
                      <span className='sider-list-title'>{v.title}</span>
                    </Link>
                  )
                  : (
                    <span
                      className={`sider-list-item ${active === v.key ? 'active' : ''}${v.noaction ? ' noaction' : ''}`}
                      onClick={e => {
                        if (v.children && v.children.length) {
                          this.LOCK = true
                          const el = this.getClickElement(e.target)
                          if (prev && el && !prev.isSameNode(el)) {
                            this.toggleSlide(prev, true, null)
                          }
                          prev = el

                          const open = !ctrls[v.key]
                          ctrls = {}
                          ctrls[v.key] = open
                          if (parent) {
                            ctrls[parent] = open
                          }
                          active = v.key

                          this.setState({ctrls, active, prev})
                          el && this.toggleSlide(el, !ctrls[v.key], null, true)
                        }
                      }}
                    >
                      {
                        v.icon
                          ? (<span className='sider-list-icon'>{v.icon}</span>)
                          : ''
                      }
                      <span className='sider-list-title'>{v.title}</span>
                      {
                        v.children && v.children.length && !collapse && (
                          <Icon className='mark-arrow' name={`${ctrls[v.key] ? 'up' : 'down'}`} />
                        )
                      }
                    </span>
                  )
              }
              {
                v.children && v.children.length && !collapse && (
                  <React.Fragment>
                    {
                      this.renderNavs(v.children, v.key)
                    }
                  </React.Fragment>
                )
              }
            </li>
          ))
        }
      </ul>
    )
  }

  render () {
    let {
      collapse
    } = this.state
    let {
      sider = {},
      style
    } = this.props
    let {
      items = [],
      top = ''
    } = sider

    return (
      <div className={`sider ${collapse ? 'collapse' : ''}`} style={style}>
        { top || '' }
        <div className='sider-list-box'>
          {
            this.renderNavs(items)
          }
        </div>
      </div>

    )
  }
}

export default Sider