# Lattice Type Anatomy

## Overview
All GraphQL schema types implemented in lattice extend from a base class
called `GQLBase`. Like `React.Component` this base class allows the framework
to do a lot of things in the background for you that would be very difficult
to easily achieve using simply functions.

Lattice endeavors to get boilerplate out of your way rather than making you
adopt more just to get started. The idea is that you should be able to very
quickly define your types and be ready to go.

## Decorators and Asynchronous Code

It is hard to build a meaningful GraphQL implementation without writing
asynchronous code someplace. Facebook has done a lot of hard work to make
async functions simply and magically work for you in the background. As such, Lattice attempts to do the same. In many places, you can simply add
`async` in front of a function and it will *just work*.

Likewise, decorators can reduce quite a bit of boilerplate for you as well.
Lattice uses ES7 decorators heavily to reduce work needed by the engineer, but
it does also work without decorators. This demo will not go into the usage
pattern of Lattice without decorators but know that it is possible to use
the framework without them.

## Show me already!

Here are some examples:

```javascript
import { GQLBase, Schema, Properties } from 'graphql-lattice'

@Schema(/* GraphQL */`
  type MyContrivedType {
    name: String
    job: String
  }
`)
@Properties('name', 'job')
export class MyContrivedType extends GQLBase { }
```

### Models and Data

The above class is all that is needed to create a GraphQL type that is backed by
data that, at a minimum, looks like this

```json
{
  "name": "Jane Doe",
  "job": "FBI Agent"
}
```

GraphQL Lattice types know that most of the time you are retrieving data from
a REST endpoint or a database or even off the disk itself. No matter where it
comes from, however, you will usually end up with a JavaScript object that
contains this data.

Each Lattice base class is built around a model. This model is the JavaScript
object that contains the data its type works from. Sometimes you will need to
do calculations before displaying this data, but many times a direct pass-thru
is more than sufficient.

In the above example, the decorator `@Properties` denotes that the two fields
`name` and `job` should be pulled from the data object using properties with
the same names. This will not always be the case, but for most of the
properties, you will often be able to get away with exactly this type of code.


