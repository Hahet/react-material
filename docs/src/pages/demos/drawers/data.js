export default [
  {
    name:'中国',onHandle:12,
    open:true,
    children:[
      {
        name:'山东',
        children:[
          {
            name:'日照',
            children:[
              {
                name:'莒县',

              }
            ]
          },
          {
            name:'青岛',
          }
        ]
      },
      {
        name:'上海',
        before:()=>false,
        children:[
          {
            name:'长宁',
            children:[
              {
                name:'长宁支路'
              },
              {
                name:'江苏路'
              }
            ]
          },
          {
            name:'普陀',
          }
        ]
      }
    ]
  },
  {
    name:'美国',
    children:[
      {
        name:'华盛顿',
      },
      {
        name:'纽约'
      }
    ]
  }
]
