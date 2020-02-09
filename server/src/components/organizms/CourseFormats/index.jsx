import React from 'react';
import cn from 'classnames';
import styles from './style.module.scss';

const CourseFormats = function({
  totalfreeFormat,
  lightFormat,
  standartFormat,
  advancedFormat,
  ninjaFormat,
  incubatorFormat,
}) {
  return (
    <div className={styles.tabs}>
      <Tabs>
        <Tab label="Total free">
          <div className={styles.content}>
            <ul>
              {totalfreeFormat.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </Tab>
        <Tab label="Light">
          <div className={styles.content}>
            <ul>
              {lightFormat.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </Tab>
        <Tab label="Standart">
          <div className={styles.content}>
            <ul>
              {standartFormat.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </Tab>
        <Tab label="Advanced">
          <div className={styles.content}>
            <ul>
              {advancedFormat.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </Tab>
        <Tab label="Ninja">
          <div className={styles.content}>
            <ul>
              {ninjaFormat.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </Tab>
        <Tab label="Incubator">
          <div className={styles.content}>
            <ul>
              {incubatorFormat.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

class Tabs extends React.Component {
  constructor(props) {
    super(props);
    const { children } = this.props;
    this.state = {
      activeTab: children[0].props.label,
    };
  }

  changeTab = tab => {
    this.setState({ activeTab: tab });
  };

  render() {
    let content;
    const buttons = [];
    const { children } = this.props;
    const { activeTab } = this.state;
    return (
      <div>
        {React.Children.map(children, child => {
          buttons.push(child.props.label);
          if (child.props.label === activeTab) content = child.props.children;
        })}

        <TabButtons activeTab={activeTab} buttons={buttons} changeTab={this.changeTab} />
        <div className={styles.tab__content}>{content}</div>
      </div>
    );
  }
}

const TabButtons = ({ buttons, changeTab, activeTab }) => {
  return (
    <div className={styles.items}>
      {buttons.map((button, i) => {
        return (
          <button
            key={i}
            className={cn(button === activeTab ? styles.item_active : false, styles.item)}
            onClick={() => changeTab(button)}
          >
            {button}
          </button>
        );
      })}
    </div>
  );
};

const Tab = ({ children }) => <>{children}</>;

export default CourseFormats;
