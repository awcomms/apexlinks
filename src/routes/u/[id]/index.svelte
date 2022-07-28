<script context="module">
  import { api } from "$lib/util";
  export const load = async ({ params, fetch }) => {
    let { id } = params;
    const include = JSON.stringify(["username", "tags", "text"]);
    const user = await api.get(`users/${id}?include=${include}`, fetch);
    if (!user.OK) {
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

<script lang="ts">
  export let user;
  import { Tags } from "$lib/components/Tag";
  import { session } from "$app/stores";
  import { Row, Link, Column } from "carbon-components-svelte";
  import { routes } from "$lib/util";

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

  let tags = user.tags || [];
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

{#if $session.user}
  <Row noGutter>
    <Column>
      <Link href={routes.userTxt(user.id)}>send txt</Link>
    </Column>
  </Row>
{/if}

<Row noGutter>
  <Column>
    <Link href="{routes.txts}?user={user.id}">all txts by this user</Link>
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

<Row noGutter>
  <Column>
    <Tags showHiddenCount={true} open={true} {tags} editable={false} />
  </Column>
</Row>
