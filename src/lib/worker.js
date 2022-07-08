let port_count = 0;
let online_state = false;
import { post } from "$lib/utils/fetch";

self.addEventListener("connect", ({ ports }) => {
  const port = ports[0];

  port.addEventListener("message", async ({ data }) => {
    const opts = {
      method: "PUT",
      path: "users",
      data: {},
    };
    switch (data.action) {
      case "online": {
        let prev_online_state = online_state;
        if (data.value) {
          ++port_count;
        } else {
          --port_count;
        }
        online_state = port_count > 0;
        if (prev_online_state !== online_state) {
          console.log("works haha");
          opts.data.online = online_state;
          await post("/send", opts);
        }
      }
    }
  });
});
