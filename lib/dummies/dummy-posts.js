const DUMMY_POSTS = [
  {
    id: "p1",
    slug: "the-best-ux-ui-for-your-site",
    thumbnail: "/image/the-best-ux-ui-for-your-site/thumb.jpg",
    title: "The best UX/UI for your Site!",
    recap: "Lorem ito ando non se sa",
    author: "Antonio Giachin",
    content: `<h1>Great Idea:</h1>
    <h2>Listen to me:</h2>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui accusamus praesentium tenetur. Ut minima id a assumenda, nostrum at laboriosam, saepe consequatur dolorem voluptas rerum unde ea sint qui dolorum?
    Ipsam ex voluptates impedit placeat, a, officiis tempore, vel voluptatem atque inventore consectetur numquam excepturi. Atque commodi consequatur debitis reiciendis a explicabo sed fuga consequuntur, eveniet, est in itaque hic.
    Consequuntur tempore maxime <em>optio saepe atque</em> nostrum mollitia <em>quo voluptas iusto pariatur</em> repellat tempora reiciendis, iste, enim molestiae aliquam distinctio praesentium perspiciatis quasi tenetur expedita ipsam, rerum ducimus. Ea, magni.
    Aliquid, cumque. Culpa quia excepturi sed quos natus amet expedita, accusamus eos id. Nesciunt, nostrum exercitationem repellat itaque recusandae atque vel perferendis illum voluptatibus dolore quos id, praesentium excepturi repudiandae!
    Ut quas deleniti molestiae eius earum perspiciatis, nobis iure nisi numquam, iste fugit perferendis ipsum harum tenetur natus sapiente accusantium, <strong>pariatur totam voluptas</strong>. Doloribus placeat, deserunt <em>non possimus nihil quae</em>!
    Quos quod obcaecati iusto, excepturi quam accusamus. Nam, necessitatibus impedit. Necessitatibus id illum sapiente blanditiis accusantium vitae odio distinctio cum! Veritatis nam quisquam enim voluptatum ea ex nesciunt sequi incidunt?
    Dolorum sed iure expedita consectetur quis veritatis facilis, accusamus maxime quibusdam nesciunt, iste ipsam eveniet magnam dolores hic neque cumque natus est totam voluptas obcaecati aut. Error voluptatibus nesciunt debitis.
    Iste, doloremque saepe explicabo corporis veniam ad a quisquam! Autem impedit obcaecati eos, laborum ab fugit corrupti nemo ut animi, inventore vitae ipsum corporis nulla! Ad, ea. Similique, necessitatibus est?
    Vitae sed, voluptatem nesciunt <strong>rem libero sit ut labore</strong>, possimus voluptate nobis, distinctio est! Reiciendis quas suscipit adipisci atque laborum aliquid eius molestias doloremque in. Minima in consectetur voluptatum fuga.
    Officia expedita earum aspernatur exercitationem? Sint fugit enim impedit unde et adipisci eligendi, porro consectetur natus placeat debitis quod modi ratione mollitia quasi aliquid dicta amet cum? Sint, magnam dolor.</p>
    <h5>This is all for now folks!</h5>`,
    reviews: [],
    isFeatured: true,
  },
  {
    id: "p2",
    slug: "things-you-should-know-as-web-dev",
    thumbnail: "/image/the-best-ux-ui-for-your-site/thumb.jpg",
    title: "Things you should know as WebDev",
    recap: "Lorem ito ando non se sa",
    author: "Antonio Giachin",
    content: `<h1>Great Idea:</h1>
    <h2>Listen to me:</h2>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui accusamus praesentium tenetur. Ut minima id a assumenda, nostrum at laboriosam, saepe consequatur dolorem voluptas rerum unde ea sint qui dolorum?
    Ipsam ex voluptates impedit placeat, a, officiis tempore, vel voluptatem atque inventore consectetur numquam excepturi. Atque commodi consequatur debitis reiciendis a explicabo sed fuga consequuntur, eveniet, est in itaque hic.
    Consequuntur tempore maxime <em>optio saepe atque</em> nostrum mollitia <em>quo voluptas iusto pariatur</em> repellat tempora reiciendis, iste, enim molestiae aliquam distinctio praesentium perspiciatis quasi tenetur expedita ipsam, rerum ducimus. Ea, magni.
    Aliquid, cumque. Culpa quia excepturi sed quos natus amet expedita, accusamus eos id. Nesciunt, nostrum exercitationem repellat itaque recusandae atque vel perferendis illum voluptatibus dolore quos id, praesentium excepturi repudiandae!
    Ut quas deleniti molestiae eius earum perspiciatis, nobis iure nisi numquam, iste fugit perferendis ipsum harum tenetur natus sapiente accusantium, <strong>pariatur totam voluptas</strong>. Doloribus placeat, deserunt <em>non possimus nihil quae</em>!
    Quos quod obcaecati iusto, excepturi quam accusamus. Nam, necessitatibus impedit. Necessitatibus id illum sapiente blanditiis accusantium vitae odio distinctio cum! Veritatis nam quisquam enim voluptatum ea ex nesciunt sequi incidunt?
    Dolorum sed iure expedita consectetur quis veritatis facilis, accusamus maxime quibusdam nesciunt, iste ipsam eveniet magnam dolores hic neque cumque natus est totam voluptas obcaecati aut. Error voluptatibus nesciunt debitis.
    Iste, doloremque saepe explicabo corporis veniam ad a quisquam! Autem impedit obcaecati eos, laborum ab fugit corrupti nemo ut animi, inventore vitae ipsum corporis nulla! Ad, ea. Similique, necessitatibus est?
    Vitae sed, voluptatem nesciunt <strong>rem libero sit ut labore</strong>, possimus voluptate nobis, distinctio est! Reiciendis quas suscipit adipisci atque laborum aliquid eius molestias doloremque in. Minima in consectetur voluptatum fuga.
    Officia expedita earum aspernatur exercitationem? Sint fugit enim impedit unde et adipisci eligendi, porro consectetur natus placeat debitis quod modi ratione mollitia quasi aliquid dicta amet cum? Sint, magnam dolor.</p>
    <h5>This is all for now folks!</h5>`,
    reviews: [],
    isFeatured: false,
  },
  {
    id: "p3",
    slug: "redux-crash-course",
    thumbnail: "/image/the-best-ux-ui-for-your-site/thumb.jpg",
    title: "Redux Crash course!",
    recap: "Lorem ito ando non se sa",
    author: "Antonio Giachin",
    content: `<h1>Great Idea:</h1>
    <h2>Listen to me:</h2>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui accusamus praesentium tenetur. Ut minima id a assumenda, nostrum at laboriosam, saepe consequatur dolorem voluptas rerum unde ea sint qui dolorum?
    Ipsam ex voluptates impedit placeat, a, officiis tempore, vel voluptatem atque inventore consectetur numquam excepturi. Atque commodi consequatur debitis reiciendis a explicabo sed fuga consequuntur, eveniet, est in itaque hic.
    Consequuntur tempore maxime <em>optio saepe atque</em> nostrum mollitia <em>quo voluptas iusto pariatur</em> repellat tempora reiciendis, iste, enim molestiae aliquam distinctio praesentium perspiciatis quasi tenetur expedita ipsam, rerum ducimus. Ea, magni.
    Aliquid, cumque. Culpa quia excepturi sed quos natus amet expedita, accusamus eos id. Nesciunt, nostrum exercitationem repellat itaque recusandae atque vel perferendis illum voluptatibus dolore quos id, praesentium excepturi repudiandae!
    Ut quas deleniti molestiae eius earum perspiciatis, nobis iure nisi numquam, iste fugit perferendis ipsum harum tenetur natus sapiente accusantium, <strong>pariatur totam voluptas</strong>. Doloribus placeat, deserunt <em>non possimus nihil quae</em>!
    Quos quod obcaecati iusto, excepturi quam accusamus. Nam, necessitatibus impedit. Necessitatibus id illum sapiente blanditiis accusantium vitae odio distinctio cum! Veritatis nam quisquam enim voluptatum ea ex nesciunt sequi incidunt?
    Dolorum sed iure expedita consectetur quis veritatis facilis, accusamus maxime quibusdam nesciunt, iste ipsam eveniet magnam dolores hic neque cumque natus est totam voluptas obcaecati aut. Error voluptatibus nesciunt debitis.
    Iste, doloremque saepe explicabo corporis veniam ad a quisquam! Autem impedit obcaecati eos, laborum ab fugit corrupti nemo ut animi, inventore vitae ipsum corporis nulla! Ad, ea. Similique, necessitatibus est?
    Vitae sed, voluptatem nesciunt <strong>rem libero sit ut labore</strong>, possimus voluptate nobis, distinctio est! Reiciendis quas suscipit adipisci atque laborum aliquid eius molestias doloremque in. Minima in consectetur voluptatum fuga.
    Officia expedita earum aspernatur exercitationem? Sint fugit enim impedit unde et adipisci eligendi, porro consectetur natus placeat debitis quod modi ratione mollitia quasi aliquid dicta amet cum? Sint, magnam dolor.</p>
    <h5>This is all for now folks!</h5>`,
    reviews: [],
    isFeatured: true,
  },
  {
    id: "p4",
    slug: "react-must-know-hooks",
    thumbnail: "/image/the-best-ux-ui-for-your-site/thumb.jpg",
    title: "React must know hooks!",
    recap: "Lorem ito ando non se sa",
    author: "Antonio Giachin",
    content: `<h1>Great Idea:</h1>
    <h2>Listen to me:</h2>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui accusamus praesentium tenetur. Ut minima id a assumenda, nostrum at laboriosam, saepe consequatur dolorem voluptas rerum unde ea sint qui dolorum?
    Ipsam ex voluptates impedit placeat, a, officiis tempore, vel voluptatem atque inventore consectetur numquam excepturi. Atque commodi consequatur debitis reiciendis a explicabo sed fuga consequuntur, eveniet, est in itaque hic.
    Consequuntur tempore maxime <em>optio saepe atque</em> nostrum mollitia <em>quo voluptas iusto pariatur</em> repellat tempora reiciendis, iste, enim molestiae aliquam distinctio praesentium perspiciatis quasi tenetur expedita ipsam, rerum ducimus. Ea, magni.
    Aliquid, cumque. Culpa quia excepturi sed quos natus amet expedita, accusamus eos id. Nesciunt, nostrum exercitationem repellat itaque recusandae atque vel perferendis illum voluptatibus dolore quos id, praesentium excepturi repudiandae!
    Ut quas deleniti molestiae eius earum perspiciatis, nobis iure nisi numquam, iste fugit perferendis ipsum harum tenetur natus sapiente accusantium, <strong>pariatur totam voluptas</strong>. Doloribus placeat, deserunt <em>non possimus nihil quae</em>!
    Quos quod obcaecati iusto, excepturi quam accusamus. Nam, necessitatibus impedit. Necessitatibus id illum sapiente blanditiis accusantium vitae odio distinctio cum! Veritatis nam quisquam enim voluptatum ea ex nesciunt sequi incidunt?
    Dolorum sed iure expedita consectetur quis veritatis facilis, accusamus maxime quibusdam nesciunt, iste ipsam eveniet magnam dolores hic neque cumque natus est totam voluptas obcaecati aut. Error voluptatibus nesciunt debitis.
    Iste, doloremque saepe explicabo corporis veniam ad a quisquam! Autem impedit obcaecati eos, laborum ab fugit corrupti nemo ut animi, inventore vitae ipsum corporis nulla! Ad, ea. Similique, necessitatibus est?
    Vitae sed, voluptatem nesciunt <strong>rem libero sit ut labore</strong>, possimus voluptate nobis, distinctio est! Reiciendis quas suscipit adipisci atque laborum aliquid eius molestias doloremque in. Minima in consectetur voluptatum fuga.
    Officia expedita earum aspernatur exercitationem? Sint fugit enim impedit unde et adipisci eligendi, porro consectetur natus placeat debitis quod modi ratione mollitia quasi aliquid dicta amet cum? Sint, magnam dolor.</p>
    <h5>This is all for now folks!</h5>`,
    reviews: [],
    isFeatured: true,
  },
  {
    id: "p5",
    slug: "my-vs-code-settings",
    thumbnail: "/image/the-best-ux-ui-for-your-site/thumb.jpg",
    title: "My Vs Code Settings!",
    recap: "Lorem ito ando non se sa",
    author: "Antonio Giachin",
    content: `<h1>Great Idea:</h1>
    <h2>Listen to me:</h2>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui accusamus praesentium tenetur. Ut minima id a assumenda, nostrum at laboriosam, saepe consequatur dolorem voluptas rerum unde ea sint qui dolorum?
    Ipsam ex voluptates impedit placeat, a, officiis tempore, vel voluptatem atque inventore consectetur numquam excepturi. Atque commodi consequatur debitis reiciendis a explicabo sed fuga consequuntur, eveniet, est in itaque hic.
    Consequuntur tempore maxime <em>optio saepe atque</em> nostrum mollitia <em>quo voluptas iusto pariatur</em> repellat tempora reiciendis, iste, enim molestiae aliquam distinctio praesentium perspiciatis quasi tenetur expedita ipsam, rerum ducimus. Ea, magni.
    Aliquid, cumque. Culpa quia excepturi sed quos natus amet expedita, accusamus eos id. Nesciunt, nostrum exercitationem repellat itaque recusandae atque vel perferendis illum voluptatibus dolore quos id, praesentium excepturi repudiandae!
    Ut quas deleniti molestiae eius earum perspiciatis, nobis iure nisi numquam, iste fugit perferendis ipsum harum tenetur natus sapiente accusantium, <strong>pariatur totam voluptas</strong>. Doloribus placeat, deserunt <em>non possimus nihil quae</em>!
    Quos quod obcaecati iusto, excepturi quam accusamus. Nam, necessitatibus impedit. Necessitatibus id illum sapiente blanditiis accusantium vitae odio distinctio cum! Veritatis nam quisquam enim voluptatum ea ex nesciunt sequi incidunt?
    Dolorum sed iure expedita consectetur quis veritatis facilis, accusamus maxime quibusdam nesciunt, iste ipsam eveniet magnam dolores hic neque cumque natus est totam voluptas obcaecati aut. Error voluptatibus nesciunt debitis.
    Iste, doloremque saepe explicabo corporis veniam ad a quisquam! Autem impedit obcaecati eos, laborum ab fugit corrupti nemo ut animi, inventore vitae ipsum corporis nulla! Ad, ea. Similique, necessitatibus est?
    Vitae sed, voluptatem nesciunt <strong>rem libero sit ut labore</strong>, possimus voluptate nobis, distinctio est! Reiciendis quas suscipit adipisci atque laborum aliquid eius molestias doloremque in. Minima in consectetur voluptatum fuga.
    Officia expedita earum aspernatur exercitationem? Sint fugit enim impedit unde et adipisci eligendi, porro consectetur natus placeat debitis quod modi ratione mollitia quasi aliquid dicta amet cum? Sint, magnam dolor.</p>
    <h5>This is all for now folks!</h5>`,
    reviews: [],
    isFeatured: false,
  },
  {
    id: "p6",
    slug: "welcome-to-my-blog",
    thumbnail: "/image/the-best-ux-ui-for-your-site/thumb.jpg",
    title: "Welcome to My Blog!",
    recap: "Lorem ito ando non se sa",
    author: "Antonio Giachin",
    content: `<h1>Great Idea:</h1>
    <h2>Listen to me:</h2>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui accusamus praesentium tenetur. Ut minima id a assumenda, nostrum at laboriosam, saepe consequatur dolorem voluptas rerum unde ea sint qui dolorum?
    Ipsam ex voluptates impedit placeat, a, officiis tempore, vel voluptatem atque inventore consectetur numquam excepturi. Atque commodi consequatur debitis reiciendis a explicabo sed fuga consequuntur, eveniet, est in itaque hic.
    Consequuntur tempore maxime <em>optio saepe atque</em> nostrum mollitia <em>quo voluptas iusto pariatur</em> repellat tempora reiciendis, iste, enim molestiae aliquam distinctio praesentium perspiciatis quasi tenetur expedita ipsam, rerum ducimus. Ea, magni.
    Aliquid, cumque. Culpa quia excepturi sed quos natus amet expedita, accusamus eos id. Nesciunt, nostrum exercitationem repellat itaque recusandae atque vel perferendis illum voluptatibus dolore quos id, praesentium excepturi repudiandae!
    Ut quas deleniti molestiae eius earum perspiciatis, nobis iure nisi numquam, iste fugit perferendis ipsum harum tenetur natus sapiente accusantium, <strong>pariatur totam voluptas</strong>. Doloribus placeat, deserunt <em>non possimus nihil quae</em>!
    Quos quod obcaecati iusto, excepturi quam accusamus. Nam, necessitatibus impedit. Necessitatibus id illum sapiente blanditiis accusantium vitae odio distinctio cum! Veritatis nam quisquam enim voluptatum ea ex nesciunt sequi incidunt?
    Dolorum sed iure expedita consectetur quis veritatis facilis, accusamus maxime quibusdam nesciunt, iste ipsam eveniet magnam dolores hic neque cumque natus est totam voluptas obcaecati aut. Error voluptatibus nesciunt debitis.
    Iste, doloremque saepe explicabo corporis veniam ad a quisquam! Autem impedit obcaecati eos, laborum ab fugit corrupti nemo ut animi, inventore vitae ipsum corporis nulla! Ad, ea. Similique, necessitatibus est?
    Vitae sed, voluptatem nesciunt <strong>rem libero sit ut labore</strong>, possimus voluptate nobis, distinctio est! Reiciendis quas suscipit adipisci atque laborum aliquid eius molestias doloremque in. Minima in consectetur voluptatum fuga.
    Officia expedita earum aspernatur exercitationem? Sint fugit enim impedit unde et adipisci eligendi, porro consectetur natus placeat debitis quod modi ratione mollitia quasi aliquid dicta amet cum? Sint, magnam dolor.</p>
    <h5>This is all for now folks!</h5>`,
    reviews: [],
    isFeatured: false,
  },
];

export const getAllPosts = (limit = 100) => {
  return DUMMY_POSTS.slice(0, limit);
};

export const getAllFeaturedPosts = () => {
  return DUMMY_POSTS.filter((post) => post.isFeatured);
};

export const getPostBySlug = (slug) => {
  return DUMMY_POSTS.filter((post) => post.slug === slug)[0];
};
