export default function() {
  return [
    {
      title: "Dashboard",
      to: "/blog-overview",
      htmlBefore: '<i class="material-icons">home</i>',
      htmlAfter: ""
    },
    {
      title: "Data User",
      htmlBefore: '<i class="material-icons">people</i>',
      to: "/data-user",
    },
    {
      title: "Data Santri",
      htmlBefore: '<i class="material-icons">school</i>',
      to: "/data-santri",
    },
    {
      title: "Koperasi Wiriosoe",
      htmlBefore: '<i class="material-icons">local_grocery_store</i>',
      to: "/product-koperasi",
    },
    {
      title: "Blog Posts",
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: "/blog-posts",
    },
    {
      title: "Add New Post",
      htmlBefore: '<i class="material-icons">note_add</i>',
      to: "/add-new-post",
    }
  ];
}
