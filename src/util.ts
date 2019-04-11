// Copy from mobx-react

let symbolId = 0
function createSymbol(name: string) {
  if (typeof Symbol === "function") {
    return Symbol(name)
  }
  const symbol = `__$korok-react ${name} (${symbolId})`
  symbolId++
  return symbol
}

const createdSymbols: any = {}
export function newSymbol(name: string) {
  if (!createdSymbols[name]) {
    createdSymbols[name] = createSymbol(name)
  }
  return createdSymbols[name]
}

const korokMixins = newSymbol("patchMixins")
const korokPatchedDefinition = newSymbol("patchedDefinition")

function getMixins(target: any, methodName: string) {
  const mixins = (target[korokMixins] = target[korokMixins] || {})
  const methodMixins = (mixins[methodName] = mixins[methodName] || {})
  methodMixins.locks = methodMixins.locks || 0
  methodMixins.methods = methodMixins.methods || []
  return methodMixins
}

function wrapper(realMethod: any, mixins: any, ...args: any[]) {
  // locks are used to ensure that mixins are invoked only once per invocation, even on recursive calls
  mixins.locks++

  try {
    let retVal
    if (realMethod !== undefined && realMethod !== null) {
      retVal = realMethod.apply(this, args)
    }

    return retVal
  } finally {
    mixins.locks--
    if (mixins.locks === 0) {
      mixins.methods.forEach((mx: any) => {
        mx.apply(this, args)
      })
    }
  }
}

function wrapFunction(realMethod: any, mixins: any) {
  const fn = function(...args: any[]) {
    wrapper.call(this, realMethod, mixins, ...args)
  }
  return fn
}

export function patch(target: any, methodName: string, ...mixinMethods: any[]) {
  const mixins = getMixins(target, methodName)

  for (const mixinMethod of mixinMethods) {
    if (mixins.methods.indexOf(mixinMethod) < 0) {
      mixins.methods.push(mixinMethod)
    }
  }

  const oldDefinition: any = Object.getOwnPropertyDescriptor(target, methodName)
  if (oldDefinition && oldDefinition[korokPatchedDefinition]) {
    // already patched definition, do not repatch
    return
  }

  const originalMethod = target[methodName]
  const newDefinition = createDefinition(
    target,
    methodName,
    oldDefinition ? oldDefinition.enumerable : undefined,
    mixins,
    originalMethod
  )

  Object.defineProperty(target, methodName, newDefinition)
}

function createDefinition(target: any, methodName: string, enumerable: boolean, mixins: any, originalMethod: any) {
  let wrappedFunc = wrapFunction(originalMethod, mixins)

  return {
    [korokPatchedDefinition]: true,
    get: function() {
      return wrappedFunc
    },
    set: function(value: any) {
      if (this === target) {
        wrappedFunc = wrapFunction(value, mixins)
      } else {
        // when it is an instance of the prototype/a child prototype patch that particular case again separately
        // since we need to store separate values depending on wether it is the actual instance, the prototype, etc
        // e.g. the method for super might not be the same as the method for the prototype which might be not the same
        // as the method for the instance
        const newDefinition = createDefinition(this, methodName, enumerable, mixins, value)
        Object.defineProperty(this, methodName, newDefinition)
      }
    },
    configurable: true,
    enumerable: enumerable
  }
}