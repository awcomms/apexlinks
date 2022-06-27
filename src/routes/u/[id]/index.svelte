<script context="module">
  import { api } from "$lib/utils";
  export const load = async ({ params, fetch }) => {
    let { id } = params;
    let user = await api.get(`users/${id}`, fetch);
    if (!user.OK) {
      console.log("yeet");
      return {
        status: Number(user.STATUS),
        error: user.error,
      };
    }
    if (!user.tags) user.tags = [];
    return {
      props: {
        user,
      },
    };
  };
</script>

<script>
  export let user;
  import { Row, Link, Column, Tag } from "carbon-components-svelte";
  import { routes } from "$lib/utils";

  // onMount(() => {
  //   (() => {
  //     if (!user.fields) return;
  //     let ld = {
  //       "@context": "https://schema.org",
  //       "@type": "Organization",
  //     };
  //     user.fields.forEach((field) => {
  //       if (!(field.label in ld)) ld[field.label] = field.value;
  //     });
  //     document.getElementById("ld").innerText = JSON.stringify(ld);
  //   })();
  // });
</script>

<svelte:head>
  <meta
    name="keywords"
    content={(() => {
      let stringOfTags = "";
      user.tags.forEach((t, i, a) => {
        let tagString = i === a.length - 1 ? t : `${t}, `;
        stringOfTags = stringOfTags.concat(tagString);
      });
      return stringOfTags;
    })()}
  />
  <meta name="description" content="{user.name}'s Apexlinks page" />
  <title>/{user.username}</title>
  <script id="ld" type="application/ld+json"></script>
</svelte:head>

<Row noGutter>
  <Column>
    <Link href={routes.userTxt(user.id)}>Txt</Link>
  </Column>
</Row>

{#if user.image}
  <Row noGutter>
    <Column lg={2} sm={2} md={2} xlg={2}>
      <img style="width: 100%;" alt="user display _image" src={user.image} />
    </Column>
  </Row>
{/if}

<Row noGutter>
  <Column>
    <p>id: {user.id}</p>
    <p>username: {user.username}</p>
  </Column>
</Row>

{#each user.tags as tag}
  {#if !tag.hide}
    <Row noGutter>
      <Column>
        <Tag>{tag.value}</Tag>
      </Column>
    </Row>
  {/if}
{/each}
