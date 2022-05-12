<!-- <Tabs bind:selected>
  <Tab label="Set user" />
  <Tab label="Search results" />
  <Tab label="Set Parents" />
  <Tab label="Set Sub Items" />
  <svelte:fragment slot="content">
    <div bind:this={tabsRef}>
      <TabContent>
        <Users
          showSelected
          bind:selected={user}
          on:click={(e) => {
            user = e.detail;
            selected = 1;
          }}
        />
      </TabContent>

      <TabContent>
        <Items
          {add}
          on:add={({ detail }) =>
            dispatch("add", { type: "result", value: detail.value })}
          labelText={resultLabelText}
          on:click
          on:del
          {sameUser}
          bind:options
          {user}
          bind:items={$items}
          bind:children={$children}
          bind:parents={$parents}
          bind:tags={$itemTags}
        />
      </TabContent>

      {#each tabs as tab}
        <TabContent>
          <ItemsTab
            {add}
            {user}
            {sameUser}
            {optEvent}
            {optSelected}
            name={tab.name}
            type={tab.type}
            showOptions={tab.showOptions}
            labelText={tab.labelText}
            bind:selected={tab.selected}
            bind:children={tab.children}
            bind:parents={tab.parents}
            bind:options={tab.options}
            bind:items={tab.items}
            bind:tags={tab.tags}
            on:add={({ detail }) =>
              dispatch("add", { type: tab.type, value: detail.value })}
            on:del={({ detail }) =>
              dispatch("del", { type: tab.type, item: detail })}
            on:action={tab.onAction}
            on:click
          />
        </TabContent>
      {/each}

     <TabContent>
        <ItemsTab
          {add}
          {user}
          {sameUser}
          {optEvent}
          {optSelected}
          bind:selected={$parents}
          bind:items={$parentItems}
          bind:tags={$parentTags}
          on:add={({ detail }) =>
            dispatch("add", { type: "parent", value: detail.value })}
          on:action={addTag}
          on:del
          labelText={parentLabelText}
          showOptions="selected"
          name="parents"
          type="parent"
        />
      </TabContent>

      <TabContent>
        <ItemsTab
          {add}
          {user}
          {sameUser}
          {optEvent}
          {optSelected}
          bind:selected={$children}
          bind:items={$childItems}
          bind:tags={$childTags}
          on:add={({ detail }) =>
            dispatch("add", { type: "child", value: detail.value })}
          on:del={({ detail }) => dispatch("del", { type: "child", detail })}
          labelText={childLabelText}
          name="children"
          type="child"
        />
      </TabContent>
    </div>
  </svelte:fragment>
</Tabs> -->