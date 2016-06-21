const choo = require('choo')
const sf = require('sheetify')

const tab  = e => {
  let id = e.target.dataset.for
  let target = document.getElementById(id)
  target.checked = true
}

sf('../index.css', { global: true })
console.log('')

const tabs = [  "New Employee",  "Employees",  "Payroll",  "Login",  "Menu" ]

const createInput = index => choo.view`
  <input id="panel-${index}-ctrl"  class="panel-radios" type="radio" name="tab-radios" />
  `

const createTab = (item, index) => choo.view`
  <li id="li-for-panel-${index}" onclick=${tab}>
    <label class="panel-label" data-for="panel-${index}-ctrl"> ${item} </label>
  </li>
  `

const panelOne = require('./employees')

module.exports = (params, state, send) => choo.view`
  <div>
    <input id="panel-1-ctrl"  class="panel-radios" type="radio" name="tab-radios" checked />
    ${[2,3,4,5].map(index => createInput(index))}
    <input id="nav-ctrl"      class="panel-radios" type="checkbox" name="nav-checkbox" />
    <header id="introduction">
      <h1>St. Kharhys Hospital</h1>
      <h2>Payroll Management System</h2>
    </header>
    <ul id="tabs-list"  >
      <label id="open-nav-label" for="nav-ctrl"></label>
      ${tabs.map( (item, index) => createTab(item, index + 1) )}
      <label id="close-nav-label" for="nav-ctrl">Close</label>
    </ul>
    <article id="panels">
  <div class="container">
    ${panelOne(params, state, send)}
    <section id="panel-2">
      <main>
        <h1>Input :checked</h1>
        <p>In CSS, you can query based on the <code>:checked</code> selector for <code>radios</code> and <code>checkboxes</code> to style siblings down the DOM scope. To do this, we can use the <code>~</code>. It will select same-level siblings after the given selector. Because the tab <code>labels</code> in this demo are nested and not immediate siblings, we will need to select their topmost parent that is at the same level as our <code>input</code>.</p>
        <p>To demonstrate, we will do a simplified version of this with a checkbox:</p>
        <pre><strong>&lt;!-- invisible input and its label --&gt;</strong>
&lt;input id="demo-child-toggle" type="checkbox"&gt;
&lt;label for="demo-child-toggle"&gt;Toggle #demo-child&lt;/label&gt;

<strong>&lt;-- parent to select first via "~" --&gt;</strong>
&lt;div id="demo-parent"&gt;
  <strong>&lt;-- child to select through parent --&gt;</strong>
  &lt;div id="demo-child"&gt;#demo-child&lt;/div&gt;
&lt;/div&gt;</pre>
        <p>and in our CSS:</p>
        <pre><strong>/* hiding our checkbox */</strong>
#demo-child-toggle {
  display: none;
}
<strong>/* selecting the child */</strong>
#demo-child-toggle:checked ~ #demo-parent #demo-child {
  color: #c0392b;
  font-weight: bold;
  text-transform: uppercase;
}</pre>
        <hr>
        <input id="demo-child-toggle" type="checkbox">
        <label class="demo-label" for="demo-child-toggle">Toggle #demo-child</label>
        <div id="demo-parent">
          <div id="demo-child">#demo-child</div>
        </div>
        <hr>
        <p>As you can see, we can control the style of content that comes after a hidden input by toggling it via its label.</p>
        <p>At this point you can probably get the picture for how we can conditionally display the tabbed panel content in this pen.</p>
      </main>
    </section>
    <section id="panel-3">
      <main>
        <h1>The Tabs</h1>
        <p>Here is the basic form of a tab in this demo:</p>
    <pre>&lt;li id="li-for-panel-1"&gt;
      &lt;label class="panel-label" data-for="panel-1-ctrl"&gt;CSS Radio Toggles&lt;/label&gt;
    &lt;/li&gt;</pre>
            <p>For the "active" tab to cover the bottom border, the child <code>label</code> gets an additional 2 pixels of <code>padding-top</code> while its parent <code>li</code> gets a <code>translateY(1px)</code>. This not only covers the bottom border, but gives an ever-so-subtle "moving toward you" effect by shifting the title down <code>1px</code>.</p>

    <pre>#panel-1-ctrl:checked ~ #tabs-list #li-for-panel-1 {
      transform: translate3d(0, 1px, 0);
    }
    #panel-1-ctrl:checked ~ #tabs-list #li-for-panel-1 label.panel-label {
      padding-top: 26px; <strong>/* instead of "24px" */</strong>
    }</pre>
          </main>
        </section>
        <section id="panel-4">
          <main>
            <h1>Tab :hover</h1>
            <p>When designing the <code>:hover</code> and "active" states I had a dilemma.</p>
    <pre>&lt;li id="li-for-panel-1"&gt;
      &lt;label class="panel-label" data-for="panel-1-ctrl"&gt;CSS Radio Toggles&lt;/label&gt;
    &lt;/li&gt;</pre>
            <p>Each tab <code>li</code> has a <code>border-right</code>. But when the additional <code>border-top</code> appears, we dont want the lighter <code>border-right</code> to be shown all the way to the top. The fix for this is to cancel the <code>border-right</code> on both the <code>:hover</code> and "active" state as well as style the <code>li</code>'s next sibling's <code>border-left</code>.</p>
            <p>To do this, we can use a combination of the siblings after <code>~</code> and sibling next <code>+</code> selectors:</p>
            <pre><strong>/* remove the right border on "active" state */</strong>
    #panel-1-ctrl:checked ~ #tabs-list #li-for-panel-1 {
      border-right: none;
    }
    <strong>/* add left to next sibling */</strong>
    #panel-1-ctrl:checked ~ #tabs-list #li-for-panel-1 + li {
      border-left: 1px solid #dfdfdf;
    }</pre>
          </main>
        </section>
        <section id="panel-5">
          <main>
            <h1>Menu</h1>
            <p>On small screens, the tabs fold down into an expandable menu. To trigger the menu, I use a <code>checkbox</code> (note that it appears at the top of the screen on smaller screen sizes). There are two labels that trigger this checkbox. One opens and the other closes the menu. The one that opens is absolutely positioned invisibly over the "active" menu item. The closing label is at the bottom of the open menu.</p>
            <p>The best way I have found to show and hide content without using absolute positioning is to use a combination of <code>max-height</code> and <code>opacity</code>. When "inactive", the content has a <code>max-height: 0</code> and <code>opacity: 0</code>.</p>
            <p>It also has a <code>transition: opacity</code> when I don't know the future height (this panel's content for example) and <code>transition: opacity, max-height</code> when I do know the future height (like the menu). When "active", the <code>max-height</code> and <code>opacity</code> get positive values and the content will transition in. I'm sure flexbox could get me around this hack, but this works for now.</p>
          </main>
        </section>
      </div>
    </article>
  </div>
`
